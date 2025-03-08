const express = require('express');
const path = require('path');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;

// Parse JSON request body
app.use(express.json());

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'build')));

// Extract ID from TeraBox URL
const extractIdFromUrl = (url) => {
  const match = url.match(/\/s\/([a-zA-Z0-9_-]+)/);
  return match ? match[1] : null;
};

// API endpoint to fetch video URL
app.post('/api/fetch-video', async (req, res) => {
  try {
    const { url } = req.body;

    if (!url) {
      return res.status(400).json({ error: 'URL is required' });
    }

    // Extract the ID from the TeraBox URL
    const id = extractIdFromUrl(url);

    if (!id) {
      return res.status(400).json({ error: 'Invalid TeraBox URL' });
    }

    // Construct the video URL using the extracted ID
    const videoUrl = `https://mdisksetup.shraj.workers.dev/m3u8?id=${id}`;

    // Fetch the video data
    const response = await axios.get(videoUrl);

    // Log the video URL for debugging
    console.log('Video URL:', videoUrl);

    // Send the video URL back to the client
    res.json({ videoUrl: videoUrl, data_url: url});
  } catch (error) {
    console.error('Error fetching video data:', error.message);

    // Create a detailed error response
    let errorResponse = {
      error: 'Failed to fetch video data',
    };

    if (error.response) {
      // The request was made and the API server responded with an error
      errorResponse.status = error.response.status;
      errorResponse.message = error.response.data?.message || error.response.statusText;
      errorResponse.details = error.response.data;
    } else if (error.request) {
      // The request was made but no response was received
      errorResponse.message = 'No response received from the video API';
      errorResponse.details = 'Network error or service unavailable';
    } else {
      // Something happened in setting up the request
      errorResponse.message = error.message;
    }

    console.error('Error details:', errorResponse);
    res.status(500).json(errorResponse);
  }
});

// Log requests for debugging
app.use((req, res, next) => {
  console.log(`Request: ${req.method} ${req.url}`);
  next();
});

// Catch-all handler to serve React's index.html
app.get('*', (req, res) => {
  const indexPath = path.join(__dirname, 'build', 'index.html');
  console.log(`Attempting to serve: ${indexPath}`);
  res.sendFile(indexPath);
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});
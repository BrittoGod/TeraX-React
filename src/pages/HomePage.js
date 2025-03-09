import React, { useState } from 'react';
import { Box, TextField, Button, CircularProgress, CardMedia } from '@mui/material';
import axios from 'axios';
import StatusMessage from '../components/StatusMessage';
import VideoPlayer from '../components/VideoPlayer';

function HomePage() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ message: '', type: '' });
  const [videoUrl, setVideoUrl] = useState('');
  const [videoTitle, setVideoTitle] = useState('');
  const [thumbnailUrl, setThumbnailUrl] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!url) {
      setStatus({ message: 'Please enter a URL', type: 'error' });
      return;
    }

    try {
      setLoading(true);
      setStatus({ message: 'Processing URL...', type: 'info' });

      const apiUrl = 'https://tera-express.vercel.app/api/get';
      const requestBody = { url };
      const headers = { 'Content-Type': 'application/json' };

      const response = await axios.post(apiUrl, requestBody, { headers });

      if (response.status !== 200 || !response.data.success) {
        throw new Error('Invalid URL or metadata not found');
      }

      const { title, thumbnail, videoUrl } = response.data.data;

      setVideoUrl(videoUrl);
      setVideoTitle(title);
      setThumbnailUrl(thumbnail);
      setStatus({ message: 'Video URL and metadata fetched successfully!', type: 'success' });
    } catch (error) {
      console.error('Error:', error);
      setStatus({ message: 'Error processing URL. Please check the format.', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: '800px', margin: '0 auto', padding: '2rem' }}>
      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField
          type="text"
          placeholder="Enter TeraBox URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          disabled={loading}
          fullWidth
          variant="outlined"
          label="TeraBox URL"
        />
        <Button type="submit" disabled={loading} variant="contained" color="primary" sx={{ width: 'fit-content', alignSelf: 'center' }}>
          {loading ? <CircularProgress size={20} /> : 'Generate Video URL'}
        </Button>
      </Box>

      <StatusMessage status={status} />

      {videoUrl && <VideoPlayer videoUrl={videoUrl} videoTitle={videoTitle} />}
    </Box>
  );
}

export default HomePage;
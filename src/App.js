import React, { useState } from 'react';
import styled from 'styled-components';
import ReactPlayer from 'react-player';
import axios from 'axios'; // Import axios

// Styled components
const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  font-family: Arial, sans-serif;
`;

const Title = styled.h1`
  color: #333;
  margin-bottom: 2rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 2rem;
`;

const Input = styled.input`
  padding: 1rem;
  margin-bottom: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
`;

const Button = styled.button`
  background-color: #4285f4;
  color: white;
  border: none;
  padding: 1rem;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #3367d6;
  }

  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;

const Status = styled.div`
  margin-top: 1rem;
  padding: 1rem;
  border-radius: 4px;
  width: 100%;
  text-align: center;
  background-color: ${props => props.type === 'error' ? '#ffebee' : '#e8f5e9'};
  color: ${props => props.type === 'error' ? '#c62828' : '#2e7d32'};
  display: ${props => props.message ? 'block' : 'none'};
`;

const VideoPlayerContainer = styled.div`
  margin-top: 2rem;
  width: 100%;
  max-width: 800px;
`;

const VideoTitle = styled.h2`
  color: #333;
  margin-bottom: 1rem;
  text-align: center;
`;

const DownloadButton = styled.a`
  display: inline-block;
  margin-top: 1rem;
  background-color: #34a853;
  color: white;
  border: none;
  padding: 1rem;
  border-radius: 4px;
  font-size: 1rem;
  text-decoration: none;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #2d8a4a;
  }
`;

const Thumbnail = styled.img`
  width: 100%;
  max-width: 800px;
  margin-top: 1rem;
  border-radius: 4px;
`;

function App() {
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

      // Fetch metadata (title, thumbnail, and video URL) from the API
      // API endpoint
      const apiUrl = 'https://tera-express.vercel.app/api/get';

      // Request body
      const requestBody = { url };

      // Headers
      const headers = {
        'Content-Type': 'application/json',
      };

      // Send POST request
      const response = await axios.post(apiUrl, requestBody, { headers });

      if (response.status !== 200 || !response.data.success) {
        throw new Error('Invalid URL or metadata not found');
      }

      console.log('API Response:', response.data); // Log the API response for debugging

      // Extract metadata (title, thumbnail, and video URL)
      const { title, thumbnail, videoUrl } = response.data.data;

      // Set state with fetched metadata
      setVideoUrl(videoUrl);
      setVideoTitle(title);
      setThumbnailUrl(thumbnail);
      setStatus({ message: 'Video URL and metadata fetched successfully!', type: 'info' });
    } catch (error) {
      console.error('Error:', error);
      setStatus({ 
        message: 'Error processing URL. Please check the format.', 
        type: 'error' 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppContainer>
      <Title>TeraBox Video Player</Title>
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Enter TeraBox URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          disabled={loading}
        />
        <Button type="submit" disabled={loading}>
          {loading ? 'Processing...' : 'Generate Video URL'}
        </Button>
      </Form>

      {status.message && (
        <Status type={status.type}>{status.message}</Status>
      )}

      {thumbnailUrl && (
        <Thumbnail src={thumbnailUrl} alt="Video Thumbnail" />
      )}

      {videoUrl && (
        <VideoPlayerContainer>
          {/* Display video title above the video player */}
          {videoTitle && <VideoTitle>{videoTitle}</VideoTitle>}

          <ReactPlayer
            url={videoUrl} // Use the generated video URL
            controls={true} // Show video controls (play, pause, volume, etc.)
            width="100%"
            height="auto"
            config={{
              file: {
                attributes: {
                  controlsList: 'nodownload', // Disable download option in the player
                },
              },
            }}
          />
          {/* Download Button */}
          <DownloadButton
            href={videoUrl}
            download={`${videoTitle || 'video'}.mp4`} // Use the video title as the file name
          >
            Download Video
          </DownloadButton>
        </VideoPlayerContainer>
      )}
    </AppContainer>
  );
}

export default App;
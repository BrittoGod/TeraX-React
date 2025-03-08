import React, { useState } from 'react';
import styled from 'styled-components';
import ReactPlayer from 'react-player'; // Import ReactPlayer

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

function App() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ message: '', type: '' });
  const [videoUrl, setVideoUrl] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!url) {
      setStatus({ message: 'Please enter a URL', type: 'error' });
      return;
    }

    try {
      setLoading(true);
      setStatus({ message: 'Processing URL...', type: 'info' });

      // Extract the ID from the URL
      const id = url.split('/').pop(); // Assuming the ID is in the query parameter

      if (!id) {
        setStatus({ message: 'Invalid URL: No ID found', type: 'error' });
        return;
      }

      // Construct the video URL
      const generatedVideoUrl = `https://mdisksetup.shraj.workers.dev/m3u8?id=${id}`;
      setVideoUrl(generatedVideoUrl);
      setStatus({ message: 'Video URL generated successfully!', type: 'info' });
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

      {videoUrl && (
        <VideoPlayerContainer>
          <ReactPlayer
            url={videoUrl} // Use the generated video URL
            controls={true} // Show video controls (play, pause, volume, etc.)
            width="100%"
            height="auto"
            config={{
              file: {
                attributes: {
                  controlsList: 'nodownload', // Disable download option
                },
              },
            }}
          />
        </VideoPlayerContainer>
      )}
    </AppContainer>
  );
}

export default App;
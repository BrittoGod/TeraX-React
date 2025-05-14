import React, { useState } from 'react';
import { Box, TextField, Button, CircularProgress, Typography, FormControlLabel, Checkbox } from '@mui/material';
import axios from 'axios';
import { Helmet } from 'react-helmet'; // Import Helmet
import StatusMessage from '../components/StatusMessage';
import VideoPlayer from '../components/VideoPlayer';

function HomePage() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ message: '', type: '' });
  const [videoUrl, setVideoUrl] = useState('');
  const [videoTitle, setVideoTitle] = useState('');
  const [thumbnailUrl, setThumbnailUrl] = useState('');
  const [acceptedTos, setAcceptedTos] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!url) {
      setStatus({ message: 'Please enter a URL', type: 'error' });
      return;
    }

    if (!acceptedTos) {
      setStatus({ message: 'You must accept the Terms of Service to proceed.', type: 'error' });
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

  const handleFetchAnother = () => {
    // Reset all states to initial values
    setUrl('');
    setVideoUrl('');
    setVideoTitle('');
    setThumbnailUrl('');
    setAcceptedTos(false);
    setStatus({ message: '', type: '' });
  };

  return (
    <>
      {/* Add Page Title, Meta Description, and SEO Tags */}
      <Helmet>
        <title>Tera-X</title>
        <meta
          name="description"
          content="Tera-X is an ad-free tool to download and watch Terabox videos online. Enter a Terabox URL to generate a downloadable video link or watch it directly."
        />
        <meta
          name="keywords"
          content="terabox downloader, terabox video download, terabox online watch, ad-free terabox, tera-x, download terabox videos"
        />
        <meta name="author" content="Tera-X Team" />
        <meta property="og:title" content="Tera-X" />
        <meta
          property="og:description"
          content="Tera-X is an ad-free tool to download and watch Terabox videos online. Enter a Terabox URL to generate a downloadable video link or watch it directly."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://tera-x.vercel.app" />
        <meta property="og:image" content="https://tera-x.vercel.app/server_status.png" />
        <meta property="og:site_name" content="Tera-X" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Tera-X" />
        <meta
          name="twitter:description"
          content="Tera-X is an ad-free tool to download and watch Terabox videos online. Enter a Terabox URL to generate a downloadable video link or watch it directly."
        />
        <meta name="twitter:image" content="https://tera-x.vercel.app/server_status.png" />
        <link rel="canonical" href="https://tera-x.vercel.app" />
        <link rel="icon" type="image/png" href="/server_status.png" />
      </Helmet>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: '800px', margin: '0 auto', padding: '2rem' }}>
        {/* Title and Description */}
        <Typography variant="h4" component="h1" align="center" sx={{ fontWeight: 'bold', marginBottom: '1rem' }}>
          Tera-X: Terabox Downloader
        </Typography>
        <Typography variant="body1" align="center" sx={{ marginBottom: '2rem' }}>
          Ad-free Terabox downloader and online video watcher. Enter a Terabox URL below to get started.
        </Typography>

        {/* Input Form */}
        {!videoUrl && (
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
            <Typography variant="body2" sx={{ color: 'text.secondary', textAlign: 'center' }}>
              Note: Only media files are supported. Folders are not supported.
            </Typography>

            {/* ToS Checkbox */}
            <FormControlLabel
              control={
                <Checkbox
                  checked={acceptedTos}
                  onChange={(e) => setAcceptedTos(e.target.checked)}
                  color="primary"
                />
              }
              label={
                <Typography variant="body2">
                  I agree to the <a href="/terms-of-service" target="_blank" rel="noopener noreferrer">Terms of Service</a>.
                </Typography>
              }
              sx={{ marginBottom: '1rem' }}
            />

            <Button type="submit" disabled={loading || !acceptedTos} variant="contained" color="primary" sx={{ width: 'fit-content', alignSelf: 'center' }}>
              {loading ? <CircularProgress size={20} /> : 'Generate Video URL'}
            </Button>
          </Box>
        )}

        {/* Status Message */}
        <StatusMessage status={status} />

        {/* Video Player */}
        {videoUrl && (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'center' }}>
            <VideoPlayer videoUrl={videoUrl} videoTitle={videoTitle} />
            <Button
              onClick={handleFetchAnother}
              variant="contained"
              color="primary"
              sx={{ width: 'fit-content', marginTop: '1rem' }}
            >
              Fetch Another
            </Button>
          </Box>
        )}
      </Box>
    </>
  );
}

export default HomePage;
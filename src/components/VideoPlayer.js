import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import ReactPlayer from 'react-player';
import DownloadIcon from '@mui/icons-material/Download';

function VideoPlayer({ videoUrl, videoTitle }) {
  return (
    <Box sx={{ width: '100%', maxWidth: '800px', mt: 2 }}>
      {videoTitle && (
        <Typography variant="h5" component="h2" sx={{ textAlign: 'center', mb: 2 }}>
          {videoTitle}
        </Typography>
      )}
      <ReactPlayer
        url={videoUrl}
        controls={true}
        width="100%"
        height="auto"
        config={{
          file: {
            attributes: {
              controlsList: 'nodownload',
            },
          },
        }}
      />
      <Button
        variant="contained"
        color="primary"
        startIcon={<DownloadIcon />}
        href={videoUrl}
        download={`${videoTitle || 'video'}.mp4`}
        sx={{ mt: 2, width: '100%' }}
      >
        Download Video
      </Button>
    </Box>
  );
}

export default VideoPlayer;
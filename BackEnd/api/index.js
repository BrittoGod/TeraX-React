require('dotenv').config();

const express = require('express');
//const fetch = require('node-fetch');
const { JSDOM } = require('jsdom');

const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

const cors = require('cors');
app.use(cors());

// Performance tracking variables
let requestCount = 0;
let totalResponseTime = 0;
const startTime = Date.now();

// Middleware to track performance
app.use((req, res, next) => {
    const start = Date.now();
    requestCount++;

    res.on('finish', () => {
        const duration = Date.now() - start;
        totalResponseTime += duration;
    });

    next();
});

// GET / - Display API performance and status
app.get('/', (req, res) => {
    const uptime = Math.floor((Date.now() - startTime) / 1000); // Uptime in seconds
    const averageResponseTime = requestCount > 0 ? (totalResponseTime / requestCount).toFixed(2) : 0;

    res.send(`
        <h1>API Server is Running</h1>
        <p>Welcome to the JSON API server. The server is up and running.</p>
        <h2>Performance Metrics</h2>
        <ul>
            <li><strong>Uptime:</strong> ${uptime} seconds</li>
            <li><strong>Total Requests:</strong> ${requestCount}</li>
            <li><strong>Average Response Time:</strong> ${averageResponseTime} ms</li>
        </ul>
    `);
});

// Fetch URL metadata
app.post('/api/get', async (req, res) => {
    //console.log(req.body);
    const { url } = req.body;

    if (!url) {
        return res.status(400).json({ error: 'URL is required' });
    }

    try {
        const id = url.split('/').pop(); // Assuming the ID is in the query parameter

        if (!id) {
          return res.status(400).json({ error: 'Invalid URL: No ID found' });
        }

        // Construct the video URL
        const generatedVideoUrl = `https://mdisksetup.shraj.workers.dev/m3u8?id=${id}`;
        
        // Fetch the HTML content of the URL
        const response = await fetch(url);
        const html = await response.text();

        // Parse the HTML using JSDOM
        const dom = new JSDOM(html);
        const doc = dom.window.document;

        // Extract Open Graph meta tags
        const ogTitle = doc.querySelector('meta[property="og:title"]')?.content;
        const ogUrl = doc.querySelector('meta[property="og:url"]')?.content;
        const ogImage = doc.querySelector('meta[property="og:image"]')?.content;

        // Respond with the fetched metadata
        res.json({
            success: true,
            data: {
                title: ogTitle || 'No title found',
                url: ogUrl || 'No URL found',
                thumbnail: ogImage || 'No thumbnail found',
                videoUrl: generatedVideoUrl,
            },
        });
    } catch (error) {
        console.error('Error fetching metadata:', error);
        res.status(500).json({ error: 'Failed to fetch metadata' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
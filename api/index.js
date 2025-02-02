const https = require('https');
const { URL } = require('url');

module.exports = (req, res) => {
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ error: 'URL parameter is required' });
  }

  try {
    const targetUrl = new URL(url);
    if (targetUrl.protocol !== 'https:') {
      return res.status(400).json({ error: 'Only HTTPS URLs are supported' });
    }

    https.get(targetUrl, (response) => {
      res.status(200).setHeader('Content-Type', 'text/html');
      response.pipe(res); // Pipe the response from the target URL to the client
    }).on('error', (e) => {
      res.status(500).json({ error: 'Error while fetching URL' });
    });

  } catch (error) {
    return res.status(400).json({ error: 'Invalid URL' });
  }
};

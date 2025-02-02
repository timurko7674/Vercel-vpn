module.exports = (req, res) => {
  const url = req.query.url;
  if (!url) {
    return res.status(400).json({ error: "No URL provided" });
  }

  fetch(url)
    .then((response) => response.text())
    .then((data) => res.send(data))
    .catch((error) => res.status(500).json({ error: error.message }));
};

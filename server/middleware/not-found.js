const notFound = (req, res) => {
  res.status(404).send({ error: `Route Not Exist` });
};

module.exports = notFound;

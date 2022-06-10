const errorHandler = (error, req, res, next) => {
  res.status(500).json({ error });
};

module.exports = errorHandler;

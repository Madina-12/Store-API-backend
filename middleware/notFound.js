const notFoundMiddleware = (req, res) => {
  res.status(404).send("The requested route may not exist");
};
module.exports = notFoundMiddleware;

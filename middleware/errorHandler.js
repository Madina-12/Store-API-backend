const errorHandlerMiddleware = async (err, res, req, next) => {
  console.log(err);
  return res.status(500).json({ msg: "Error occured, please try again...." });
};
module.exports = errorHandlerMiddleware;

const middleware = (req, res, next) => {
  console.log("logining....");
  next();
};

module.exports = middleware;

const handleError = (err, req, res, next) => {
  if (err.message) {
    res.status(500).send({
      success: false,
      message: err.message,
    });
  } else {
    res.status(500).send({
      success: false,
      message: "there was a server side error",
    });
  }
};

module.exports = handleError;

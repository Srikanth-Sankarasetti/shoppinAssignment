module.exports = (err, req, res, next) => {
  res.status(500).send({
    message: "Something went wrong!",
    error: err.message, // Optionally send error details
  });
};

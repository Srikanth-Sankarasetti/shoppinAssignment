module.exports = (err, req, res, next) => {
  console.log(err.stack);
  res.status(500).send({
    message: "Something went wrong!",
    error: err.message, // Optionally send error details
  });
};

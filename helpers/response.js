//used to send error response
exports.errorResponse = (res, error = "Error", code = 201, status = 400) => {
  // console.log(error)

  res.status(status).send({ message: error.message, code });
};
//used to send success response
exports.successResponse = (res, data = {}) => {
  res.send({ data });
};

exports.sendError = (res, error) => {
  // console.log(error);

  if (typeof error.code === typeof "") {
    console.log(typeof error.code);

    error.code = 400;
  }
  const code = error.code ? error.code : 400;
  const name = error.name ? error.name : "ERROR";
  res.status(code).json({ name: name, message: error.message, code: code });
};
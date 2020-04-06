exports.handleDBError = (error, response, status, errorMessage) => {
  if (error)
    console.log(error.message)
    response.status(status).send({
        message: errorMessage
    });
}

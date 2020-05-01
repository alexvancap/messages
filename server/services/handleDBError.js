exports.handleDBError = (response, status, errorMessage) => {
    response.status(status).send({
        message: errorMessage
    });
}

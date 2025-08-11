// MIDDLEWARE ERROR...
async function errorMiddleware(err, req, res, next) {
     const customError = {
          status: err.status || 500,
          message: err.message || `Internal server error`,
     }
     const { status, message } = customError;
     return res.status(status).json({
          code: `${status}`,
          message: message
     })
}

// EXPORTS...
module.exports = {errorMiddleware};
async function errorMiddleware(err,req,res,next) {
     return res.status(err.status || 500).json({
          code:`${err.status}`,
          status:'ERROR', 
          message:err.message || 'INTERNAL SERVER ERROR'
     });
}

async function notFoundMiddleware(req,res,next) {
     return res.status(404).json({
          code:'404',
          status:`NOT FOUND`,
          message:`${req.originalUrl} WITH ${req.method} METHOD NOT FOUND`
     });
}

module.exports = {errorMiddleware, notFoundMiddleware}



export const errorHandler = (err, req, res, next) => {
  const status = err.statusCode ?? 500;
  const mensaje = err.statusCode ? err.message : 'Error interno del servidor';
  
  if (!err.statusCode) console.error(err); // only log unexpected errors
  
  res.status(status).json({ mensaje });
};

export default errorHandler;
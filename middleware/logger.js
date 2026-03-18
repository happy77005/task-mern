export const logger = (req, res, next) => {
  const timestamp = new Date().toISOString();
  const method = req.method;
  const path = req.path;

  console.log(`[${timestamp}] ${method} ${path}`);

  res.on('finish', () => {
    console.log(`[${timestamp}] ${method} ${path} - ${res.statusCode}`);
  });

  next();
};

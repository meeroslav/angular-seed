module.exports = {
  isDevelopment: process.env.NODE_ENV === undefined,
  isStaging: process.env.NODE_ENV !== undefined && process.env.NODE_ENV.trim() === 'staging',
  isProduction: process.env.NODE_ENV !== undefined && process.env.NODE_ENV.trim() === 'production'
};

module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', '4ad9e3a495d39d1e80ee881af46ceb86'),
  },
});

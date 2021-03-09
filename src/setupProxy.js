const { createProxyMiddleware } = require("http-proxy-middleware");

const router = {
  "/api/auth": "https://buyer.freeginar.com/auth",
};

module.exports = function (app) {
  app.use(
    "/api/",
    createProxyMiddleware({
      target: "https://buyer.freeginar.com",
      changeOrigin: true,
      secure: false,
      pathRewrite: {
        "^/api/auth": "/",
      },
      router,
      logLevel: "debug",
    })
  );
};

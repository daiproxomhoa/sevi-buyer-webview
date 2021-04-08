const { createProxyMiddleware } = require("http-proxy-middleware");

const router = {
  "/api": "https://buyer.freeginar.com",
};

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "https://buyer.freeginar.com",
      changeOrigin: true,
      secure: false,
      pathRewrite: {
        "^/api": "",
      },
      onProxyReq: function (proxyReq, req, res) {
        proxyReq.removeHeader("Origin");
      },
      router,
      logLevel: "debug",
    })
  );
};

const client = require("prom-client");

// Create a Registry to store metrics
const register = new client.Registry();

// Enable default metrics (CPU, Memory, etc.)
client.collectDefaultMetrics({ register });

// Custom metric: HTTP request duration
const httpRequestDuration = new client.Histogram({
  name: "http_request_duration_seconds",
  help: "Duration of HTTP requests in seconds",
  labelNames: ["method", "route", "status_code"],
  buckets: [0.1, 0.5, 1, 2, 5], // Time buckets in seconds
});

register.registerMetric(httpRequestDuration);

// Middleware to measure request duration
const metricsMiddleware = (req, res, next) => {
  const end = httpRequestDuration.startTimer();
  res.on("finish", () => {
    end({ method: req.method, route: req.path, status_code: res.statusCode });
  });
  next();
};

// Route handler to expose metrics
const metricsHandler = async (req, res) => {
  res.set("Content-Type", register.contentType);
  res.send(await register.metrics());
};

module.exports = { metricsMiddleware, metricsHandler };

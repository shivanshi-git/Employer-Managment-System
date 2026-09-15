/**
 * requestLogger.js
 * Structured JSON request logger middleware.
 *
 * Logs every incoming request with:
 *  - HTTP method and path
 *  - Response status code
 *  - Response time in milliseconds
 *  - Timestamp (ISO 8601)
 *
 * Output is JSON so it can be ingested by log aggregation tools
 * like Datadog, Grafana Loki, AWS CloudWatch, or Google Cloud Logging.
 */

const requestLogger = (req, res, next) => {
  const start = Date.now();

  // Hook into 'finish' event so we capture the final status code
  res.on("finish", () => {
    const durationMs = Date.now() - start;

    const logEntry = {
      timestamp: new Date().toISOString(),
      method: req.method,
      path: req.originalUrl || req.url,
      statusCode: res.statusCode,
      durationMs,
      ip: req.ip || req.headers["x-forwarded-for"] || "unknown",
      userAgent: req.headers["user-agent"] || "unknown",
    };

    // Color-code log level by status code for local dev readability
    if (res.statusCode >= 500) {
      console.error(JSON.stringify(logEntry));
    } else if (res.statusCode >= 400) {
      console.warn(JSON.stringify(logEntry));
    } else {
      console.log(JSON.stringify(logEntry));
    }
  });

  next();
};

export default requestLogger;

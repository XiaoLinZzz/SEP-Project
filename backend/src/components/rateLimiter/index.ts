import rateLimit from "express-rate-limit";

const rateLimitMiddleware = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1500, // Limit each IP to 100 requests per `window` (here, every 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  // TODO: Do we need following options?
  // message: "You exceeded 100 requests in 12 hour limit!",
  // headers: true,
});

export default rateLimitMiddleware;

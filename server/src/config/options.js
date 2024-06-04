module.exports = {
    corsOptions: {
      origin: ["http://127.0.0.1:5500","http://localhost:5173","http://localhost:3002"],
      credentials: true,
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
      preflightContinue: false,
      optionsSuccessStatus: 204,
    },
  
    helmetOptions: {
      crossOriginEmbedderPolicy: false, 
      crossOriginResourcePolicy: {
        allowOrigins: ["http://127.0.0.1:5500","http://localhost:5173","http://localhost:3001"],
      },
      contentSecurityPolicy: {
        directives: {
          imgSrc: ["*", "data:", "blob:"],
          defaultSrc: ["*"],
          scriptSrc: ["* data: 'unsafe-eval' 'unsafe-inline' blob:"],
        },
      },
    },
    mongoSanitizeOptions: {
      dryRun: true,
      onSanitize: ({ req, key }) => {
        console.warn(`[DryRun] This request[${key}] will be sanitized`, req);
      },
    },
    rateLimitOptions: {
      windowMs: 60 * 60 * 1000, // 1 hour window
      max: 10, // Limit each IP to 10 requests per windowMs
      message: "Too many requests from this IP, please try again in an hour!",
  
      handleRateLimitExceeded: (req, res, options) => {
        res.status(429).send(options.message);
      },
    },
  };
  
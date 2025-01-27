if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const connectDB = require("./config/dbConfig");

const app = express();
const port = process.env.PORT || 8080;

const authRoutes = require("./routes/authRoutes");
const jobRoutes = require("./routes/jobRoutes");
const userRoutes = require("./routes/userRoutes");

const FRONT_ENDS = process.env.FRONT_ENDS.split(",");

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || FRONT_ENDS.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

// Apply CORS middleware
app.use(cors(corsOptions));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});
app.options("*", cors(corsOptions));

// Use Morgan middleware for logging
if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev")); // Log requests in the "dev" format in non-production environments
} else {
  app.use(morgan("combined")); // Use "combined" format for production logs
}

// Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Define routes
app.get("/", (req, res) => {
  res.status(200).json({
    root: "Standard root",
  });
});
app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/users", userRoutes);

// Handle unknown routes
app.all("*", (req, res, next) => {
  const error = new Error("No such routes available");
  error.statusCode = 404;
  next(error);
});

// Error-handling middleware
app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    error: err.message || "Internal Server Error",
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server is up at port ${port}`);
  connectDB()
    .then(() => {
      console.log("Connected to Database");
    })
    .catch((error) => {
      console.error("Database connection failed:", error);
    });
});

// Import dependencies
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import bodyParser from "body-parser";

// Import local modules
import { connectDB } from "./DB/Database.js";
import transactionRoutes from "./Routers/Transactions.js";
import userRoutes from "./Routers/userRouter.js";


dotenv.config();

// Initialize Express app
const app = express();

// Connect to MongoDB
connectDB();

// Define port
const port = process.env.PORT || 5000;

// Define allowed CORS origins
const allowedOrigins = [
  "http://localhost:3000",
  "https://main.d1sj7cd70hlter.amplifyapp.com",
  "https://expense-tracker-app-three-beryl.vercel.app",
  // Add more allowed domains if needed
];

// Middleware setup
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("dev"));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

// API routes
app.use("/api/v1", transactionRoutes);
app.use("/api/auth", userRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("✅ Expense Tracker API is running.");
});

// Allow preflight requests for all routes
app.options("*", cors());

// Start server
app.listen(port, () => {
  console.log(`🚀 Server is listening on http://localhost:${port}`);
});

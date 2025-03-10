import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import { errorHandler, routeNotFound } from "./middlewares/errorMiddlewaves.js";
import { dbConnection } from "./utils/index.js";
import routes from "./routes/index.js";
dotenv.config();

dbConnection();
// const router = express.Router();
const PORT = process.env.PORT || 5000;

const app = express();

// Allow specific origins
const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:8800",
  "https://resonant-queijadas-74315c.netlify.app",
  "https://esaylead-backend-production.up.railway.app",
];

const corsOptions = {
  origin: (origin, callback) => {
    console.log("Incoming Origin:", origin); // Debug origin
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

// app.use(cors(corsOptions));

// Apply CORS middleware
app.use(cors(corsOptions));

app.use(express.json({ limit: "10mb" })); // Adjust limit as needed
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

app.use(cookieParser());

app.use(morgan("dev"));

app.use("/api", routes);

app.get("/", (req, res) => {
  res.json({ message: "App is working!" });
});

app.use(routeNotFound);
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server listening on ${PORT}`));

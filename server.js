import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

dotenv.config();
connectDB(); // <--- IMPORTANT

const app = express();

app.use(cors());
app.use(express.json());

app.use("/uploads", express.static("uploads"));

// ROUTES
import authRoutes from "./routes/authRoutes.js";
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT;  
if (!PORT) {
  console.error("ERROR: Render did not provide a PORT");
  process.exit(1);
}


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

import express from "express";
import { signUp, signIn, getAllUsers } from "../controllers/authController.js";
import multer from "multer";
import { createTask, deleteTask, getTasks, updateTask } from "../controllers/taskContoller.js";
import { adminMiddleware } from "../middleware/adminMiddleware.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import path from "path";

const router = express.Router();

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // save in uploads folder
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext); // unique name
  },
});
const upload = multer({ storage });

// Auth routes
router.post("/signup", upload.single("profileImage"), signUp);
router.post("/signin", signIn);

// ----------------------
// TASK ROUTES PROTECTED
// ----------------------

// Create task → only logged in users
router.post("/submit-task", authMiddleware, createTask);

// Update task status → only logged in users
router.put("/update-status/:taskId", authMiddleware, updateTask);

// Get tasks → only logged in users
router.get("/tasks", authMiddleware, getTasks);

// Delete task → only admin
router.delete("/deleteTask/:taskId", authMiddleware, adminMiddleware, deleteTask);

// Get all users → only admin
router.get("/users", authMiddleware, adminMiddleware, getAllUsers);

export default router;

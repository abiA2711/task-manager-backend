import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

// SIGN UP
export const signUp = async (req, res) => {
  try {
    // For multipart/form-data, req.body fields are available as strings
    const { fullName, email, password,role } = req.body;
    const profileImage = req.file ? `/uploads/${req.file.filename}` : null;

    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if(!role){
        return res.status(400).json({message: "role must be sent"})
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }
    
    // Save file info (example: just the filename)
    const profileImagePath = profileImage ? profileImage.originalname : null;

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const lastUser = await User.findOne().sort({ createdAt: -1 });

    let newId = "U0001";

    if (lastUser?.userId) {
      const lastNumber = parseInt(lastUser.userId.substring(1)); // remove 'U'
      const nextNumber = (lastNumber + 1).toString().padStart(4, "0");
      newId = `U${nextNumber}`;
    }


    // Create user in MongoDB

    const newUser = await User.create({
      userId:newId,
      fullName,
      email,
      role,
      password: hashedPassword,
      profileImage: profileImage,
      
    });

    res.status(201).json({ message: "Account created successfully", user: newUser });

  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// SIGN IN
export const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    // FIND USER
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "Invalid email or password" });

    // CHECK PASSWORD
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid email or password" });

    // JWT TOKEN
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        role:user.role,
        userId:user.userId,
        profileImage:user.profileImage
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({},"userId _id fullName role"); 
  
    res.status(200).json({
      message: "Users fetched successfully",
      data: users,
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


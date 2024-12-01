import User from "../models/user.model.js";
import bcrypt from "bcryptjs"
import { generateToken } from "../lib/utils.js";

const signUp = async (req, res) => {
  const { email, password, fullName } = req.body;

  if (!fullName || !fullName.firstName || !fullName.lastName) {
    return res.status(400).json({ message: "Full name is required" });
  }

  const { firstName, lastName } = fullName;

  try {
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters long" });
    }

    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      fullName: { firstName, lastName },
      password: hashedPassword,
      email,
    });

    if (newUser) {
      generateToken(newUser._id, res);
      await newUser.save();
      res.status(201).json({ message: "User created successfully" });
    }
    else {
      return res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
}

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Use findOne instead of find
    const userExist = await User.findOne({ email });
    if (!userExist) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    // Check if the password is correct
    const isPassword = await bcrypt.compare(password, userExist.password);
    if (!isPassword) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    generateToken(userExist._id, res);

    // Remove password before sending the response
    const userWithoutPassword = userExist.toObject();
    delete userWithoutPassword.password;

    return res.status(200).json(userWithoutPassword);
  } catch (error) {
    console.error("Error in login:", error);
    res.status(500).json({ message: "Internal server error", error });
  }
};


const logout = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
}



export { login, logout, signUp }
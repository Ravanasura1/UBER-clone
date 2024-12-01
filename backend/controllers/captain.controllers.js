import Captain from "../models/captain.model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../lib/utils.js";

const signUp = async (req, res) => {
  const { email, password, fullName, vehicle, location } = req.body;

  if (!fullName || !fullName.firstName || !fullName.lastName) {
    return res.status(400).json({ message: "Full name is required" });
  }

  const { firstName, lastName } = fullName;

  if (!vehicle || !vehicle.color || !vehicle.plate || !vehicle.capacity || !vehicle.vehicleType) {
    return res.status(400).json({ message: "Vehicle details are required" });
  }

  try {
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters long" });
    }

    const userExist = await Captain.findOne({ email });
    if (userExist) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new Captain({
      fullName: { firstName, lastName },
      email,
      password: hashedPassword,
      vehicle: {
        color: vehicle.color,
        plate: vehicle.plate,
        capacity: vehicle.capacity,
        vehicleType: vehicle.vehicleType,
      },
    });

    if (newUser) {
      generateToken(newUser._id, res);
      await newUser.save();
      res.status(201).json({ message: "Captain created successfully" });
    } else {
      return res.status(400).json({ message: "Invalid captain data" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const userExist = await Captain.findOne({ email });
    if (!userExist) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    const isPassword = await bcrypt.compare(password, userExist.password);
    if (!isPassword) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    generateToken(userExist._id, res);

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
};

export { login, logout, signUp };

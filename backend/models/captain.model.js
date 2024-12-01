import mongoose from "mongoose";

const captainSchema = new mongoose.Schema({
  fullName: {
    firstName: {
      type: String,
      required: true,
      minLength: [3, "First name must be at least 3 characters long"]
    },
    lastName: {
      type: String,
      minLength: [3, "Last name must be at least 3 characters long"]
    }
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minLength: [5, "Email must be at least 5 characters long"]
  },
  password: {
    type: String,
    required: true,
  },
  socketId: {
    type: String,
  },
  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "inactive"
  },
  vehicle: {
    color: {
      type: String,
      required: true,
      minLength: [3, "Color must be at least 3 characters long"]
    },
    plate: {
      type: String,
      required: true,
      minlength: [3, "Plate must be at least 3 characters long"],
    },
    capacity: {
      type: Number,
      required: true,
      min: [1, "Capacity must be at least 1"]
    },
    vehicleType: {
      type: String,
      required: true,
      enum: ["car", "bike", "auto"]
    },
  },
  location: {
    lat: {
      type: Number,
    },
    lng: {
      type: Number,
    }
  }

}, { timestamps: true })

const Captain = mongoose.model("Captain", captainSchema)

export default Captain
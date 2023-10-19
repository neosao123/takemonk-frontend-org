import mongoose from "mongoose";
/* PetSchema will correspond to a collection in your MongoDB database. */
const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "Please provide a First name."],
    maxlength: [20, "First Name cannot be more than 60 characters"],
  },
  lastName: {
    type: String,
    required: [true, "Please provide a Last name."],
    maxlength: [20, "Last Name cannot be more than 60 characters"],
  },
  fullName: {
    type: String,
  },
  avatar: {
    type: Object,
  },
  gender: {
    type: String,
  },
  phone: {
    type: String,
    required: [true, "Please provide a Phone Number."],
    maxlength: [20, "Phone cannot be more than 60 characters"],
  },
  email: {
    type: String,
    unique: true,
    required: "Email address is required",
  },
  addresses: {
    type: Array,
  },
  password: {
    type: String,
    select: false,
    required: [true, "Please enter Password."],
  },
  status: {
    type: String,
  },
  about: {
    type: String,
  },
  joined: {
    type: Date,
    default: Date.now(),
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

export default mongoose.models.User || mongoose.model("User", UserSchema);

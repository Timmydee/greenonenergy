import mongoose, { Document, Schema } from "mongoose";

interface User extends Document {
  name: string;
  email: string;
  password: string;
  role: "admin" | "vendor" | "client";
  companyName?: string;  // Only for vendors
  address?: string;      // Only for vendors
  phone: string;
  isApproved: boolean;
}

const userSchema = new Schema<User>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["admin", "vendor", "client"], default: "client" },
  companyName: { type: String },
  address: { type: String },
  phone: { type: String, required: true },
  isApproved: { type: Boolean, default: false },
});

// const UserModel = mongoose.model<User>("User", userSchema);
const UserModel = mongoose.models.User || mongoose.model<User>("User", userSchema);


export default UserModel;

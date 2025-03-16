import mongoose, { Document, Schema } from "mongoose";

interface User extends Document {
  name: string;
  email: string;
  password?: string;
  role: "admin" | "vendor" | "client";
  companyName?: string;  // Only for vendors
  address?: string;      // Only for vendors
  phone?: string;
  isApproved?: boolean;
  resetPasswordToken?: string;
  resetPasswordExpires?: Date;
  isVerified: boolean;
  verificationToken?: string;
  provider: "google" | "local"

}

const userSchema = new Schema<User>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  // password: { type: String, required: true },
  role: { type: String, enum: ["admin", "vendor", "client"], default: "client" },
  companyName: { type: String },
  address: { type: String },
  password: { type: String, required: function () { return this.provider === "local"; } },
  phone: { type: String, required: function () { return this.provider === "local"; } },
  // phone: { type: String, required: true },
  isApproved: { type: Boolean, default: false },
  resetPasswordToken: { type: String },
  resetPasswordExpires: { type: Date },
  isVerified: { type: Boolean, default: false },
  verificationToken: { type: String },
  provider: { type: String, enum: ["google", "local"], default: "local" },
}, { timestamps: true
});

const UserModel = mongoose.models.User || mongoose.model<User>("User", userSchema);


export default UserModel;

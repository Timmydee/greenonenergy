import mongoose, { Schema, Document } from "mongoose";

export interface IVendor extends Document {
  companyName: string;
  email: string;
  password: string;
  contact?: {
    phone?: string;
    whatsapp?: string;
    website?: string;
  };
  isApproved: boolean;
}

const VendorSchema: Schema = new Schema(
  {
    companyName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    contact: {
      phone: { type: String },
      whatsapp: { type: String },
      website: { type: String },
    },
    isApproved: { type: Boolean, default: false }, // Admin will approve vendors
  },
  { timestamps: true }
);

export default mongoose.models.Vendor || mongoose.model<IVendor>("Vendor", VendorSchema);

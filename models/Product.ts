import mongoose, { Schema, Document, Types } from "mongoose";

export interface IProduct extends Document {
  vendorId: Types.ObjectId; // ✅ Corrected Type
  name: string;
  description: string;
  price: number;
  category: "Inverter" | "Solar Panel";
  imageUrls: string[];
}

const ProductSchema = new Schema<IProduct>({
  vendorId: { type: Schema.Types.ObjectId, ref: "Vendor", required: true }, // ✅ Matches the interface
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, enum: ["Inverter", "Solar Panel"], required: true },
  imageUrls: { type: [String], required: true },
});

export default mongoose.models.Product || mongoose.model<IProduct>("Product", ProductSchema);
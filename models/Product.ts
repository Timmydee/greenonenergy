import mongoose, { Schema, Document, Types } from "mongoose";

export interface IProduct extends Document {
  vendorId: Types.ObjectId;
  name: string;
  description: string;
  price: number;
  size: number;
  category: "Inverter" | "Solar Panel";
  capacity: string;
  wattage: string;
  // outputType?: "pure sine" | "modified sine";
  // efficiency?: number;
  // batteryType?: 'lithium-ion'| 'lead-acid' | 'gel';
  // warranty?: number;
  imageUrls: string[];
  stock: number;
  discountPrice?: number;
  published: boolean;
}

const ProductSchema = new Schema<IProduct>(
  {
    vendorId: { type: Schema.Types.ObjectId, ref: "User", required: true }, // Reference to UserModel
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, enum: ["Inverter", "Solar Panel"], required: true },
    capacity: {
      type: String,
      required: function (this: IProduct) {
        return this.category === "Inverter";
      },
    },
    wattage: {
      type: String,
      required: function (this: IProduct) {
        return this.category === "Solar Panel";
      },
    },
    // outputType: { type: String, enum: ['pure sine', 'modified sine'], required: false }, // For inverters
    // efficiency: { type: Number, required: false }, // For solar panels
    // batteryType: { type: String, enum: ['lithium-ion', 'lead-acid', 'gel'], required: false }, // For inverters
    // warranty: { type: Number, required: false }, // Warranty in months
    imageUrls: { type: [String], required: true },
    stock: { type: Number, required: true, default: 0 },
    discountPrice: { type: Number },
    published: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.models.Product || mongoose.model<IProduct>("Product", ProductSchema);

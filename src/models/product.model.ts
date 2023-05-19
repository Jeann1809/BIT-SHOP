import mongoose, { Schema } from "mongoose";

// esquema de la coleccion

const Product = new Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    category: { type: Array, required: true, default: [] },
    description: { type: String, default: true },
    images: { type: String, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model("product", Product);

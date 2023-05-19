import Express from "express";
import mongoose from "mongoose";
import productModel from "../models/product.model";

export const getProducts = async (
  req: Express.Request,
  res: Express.Response
) => {
  try {
    const result = await productModel.find();
    res.status(200).json({ result });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ msg: "Ha ocurrido un error", error });
  }
};

export const createProduct = async (
  req: Express.Request,
  res: Express.Response
) => {
  try {
    let newProduct = req.body;
    const productCreated = await productModel.create(newProduct);

    if (productCreated) return res.status(201).json({ msg: "Producto creado" });
    throw { msg: "Error al crear el producto" };
  } catch (error) {
    console.log(error);
    return res.status(400).json({ msg: "Ha ocurrido un error", error });
  }
};

export const updateProduct = async (
  req: Express.Request,
  res: Express.Response
) => {
  try {
    let { dataToUpdate, _id } = req.body;
    const updatedData = await productModel.findByIdAndUpdate(_id, dataToUpdate);
    return res.status(200).json({ msg: "Producto actualizado" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ msg: "Ha ocurrido un error", error });
  }
};

export const deleteProduct = async (
  req: Express.Request,
  res: Express.Response
) => {
  try {
    let { _id } = req.body;
    const updatedData = await productModel.findByIdAndDelete(_id);
    return res.status(200).json({ msg: "Producto eliminado" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ msg: "Ha ocurrido un error", error });
  }
};

export const factura = async (req: Express.Request, res: Express.Response) => {
  try {
    let ids = req.body;
    let arrayProducts: object[] = [];
    let suma = 0;

    for (let products of ids._id) {
      try {
        const product = await productModel.findById(products, {
          name: 1,
          _id: 0,
          price: 1,
        });
        if (product) {
          suma = suma + product.price;
          arrayProducts.push(product);
        }
      } catch (error) {
        arrayProducts.push({ msg: "El id del producto no fue encontrado" });
      }
    }
    return res.status(200).json({ Products: arrayProducts, totalAmount: suma });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ msg: "Ha ocurrido un error", error });
  }
};

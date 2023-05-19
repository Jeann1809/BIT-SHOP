import Express from "express";
import mongoose from "mongoose";
import userModel from "../models/user.model";

export const getUsers = async (req: Express.Request, res: Express.Response) => {
  try {
    const result = await userModel.find();
    res.status(200).json({ result });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ msg: "Ha ocurrido un error", error });
  }
};

export const createUser = async (
  req: Express.Request,
  res: Express.Response
) => {
  try {
    let newUser = req.body
    const usuarioExistente = await userModel.findOne({username: newUser.username})
    if (usuarioExistente){

      throw {msg:"El nombre de usuario ya ha sido registrado"}

    }
    const correoExistente = await userModel.findOne({email: newUser.email})
    if (correoExistente){

      throw {msg:"El correo electrónico ya ha sido registrado"}

    }

    let date = newUser.dateBirth.split("-");

    let hoy = new Date();
    let cumpleaños = new Date(date);
    let edad = hoy.getFullYear() - cumpleaños.getFullYear();
    let m = hoy.getMonth() - cumpleaños.getMonth();
    if (m < 0 || (m === 0 && hoy.getDate() < cumpleaños.getDate())) {
      edad--;
    }

    if (edad < 18) {
      throw { msg: "El usuario es menor de 18 años" };
    }


    const userCreated = await userModel.create(newUser)

    if(userCreated) return res.status(201).json({msg: "Usuario creado"})
    throw {msg:"Error al crear un usuario"}


  } catch (error) {
    console.log(error);
    return res.status(400).json({ msg: "Ha ocurrido un error", error });
  }
};

export const updateUser = async (req: Express.Request, res: Express.Response) => {
  try {
    
    let {dataToUpdate, _id} = req.body
    const updatedData = await userModel.findByIdAndUpdate(_id, dataToUpdate)
    return res.status(200).json ({msg: "Usuario actualizado"})

  } catch (error) {
    console.log(error);
    return res.status(400).json({ msg: "Ha ocurrido un error", error });
  }

}

export const deleteUser = async (req: Express.Request, res: Express.Response) => {
  try {
    
    let {_id} = req.body
    const updatedData = await userModel.findByIdAndDelete(_id)
    return res.status(200).json ({msg: "Usuario eliminado"})

  } catch (error) {
    console.log(error);
    return res.status(400).json({ msg: "Ha ocurrido un error", error });
  }

}

export const findUser = async (req: Express.Request, res: Express.Response) => {
  try {
    
    let {_id} = req.body
    const userfound = await userModel.findById(_id)
    return res.status(200).json ({userfound})

  } catch (error) {
    console.log(error);
    return res.status(400).json({ msg: "Ha ocurrido un error", error });
  }

}
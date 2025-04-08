import { Request, Response, NextFunction, response } from "express";
import User from "../models/user.model";
import {Inventory} from "../models/baby.model";
import { ValidationError } from "sequelize";
import { IUserRequest, ILoginRequestBody, IRegisterRequestBody } from "../interfaces/user-auth.interface";

export const register = async (
  req: Request<{}, {}, IRegisterRequestBody>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const newUser = User.build({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
      role: req.body.role || "user",
      language: req.body.language || "en",
    });
    const user = await newUser.save();
    const token = user.generateToken();
    const refreshToken = user.generateRefreshToken();

    // Update refresh token in database
    user.refreshToken = refreshToken;
    await user.save();

    res.status(201).json({ user, token });
  } catch (error) {
    if (error instanceof ValidationError) {
      const errorMessages = error.errors.map((err) => err.message);
      res.status(422).json({
        status: "fail",
        message: "Validation Error",
        errors: errorMessages,
      });
      return;
    }
    next(error);
  }
};

export const login = async (
  req: Request<{}, {}, ILoginRequestBody>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const user = await User.findOne({
      where: { email: req.body.email },
      attributes: { include: ["password", "refreshToken"] },
    });
    const errors = { emailOrPassword: "Invalid email or password" };

    if (!user) {
      res.status(422).json(errors);
      return;
    }

    const isPasswordAuthentic = await user.validatePassword(req.body.password);
    if (!isPasswordAuthentic) {
      res.status(422).json(errors);
      return;
    }
    
    const token = user.generateToken();
    const refreshToken = user.generateRefreshToken();

    // Update refresh token in database
    user.refreshToken = refreshToken;
    await user.save();

    res.status(200).json({ user, refreshToken, token });
  } catch (error) {
    next(error);
  }
};

export const currentUser = async (
  req: IUserRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    next(error);
  }
};

export const editUserThreadId = async (
  req: IUserRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id, threadId } = req.body;

    const [updated] = await User.update(
      { threadId },
      { where: { id: id } }
    );

    if (updated) {
      const updatedUser = await User.findOne({ where: { id: id } });
      res.status(200).json(updatedUser);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    next(error);
  }
};

export const createInventory = async (
  req: Request ,
  res: Response,
) => {
  try {
    const { name, quantity, category } = req.body;
    const userId = req.params.userId;
    const inventory = await Inventory.create({
      userId: userId,
      item: name,
      quantity: quantity,
      category: category,
    })
    res.status(201).json(inventory);
  } catch (error) {
    res.status(400).json({ error: error instanceof Error ? error.message : " An error occurred while createing the inventory." });
  }
}

export const getInventory = async (
  req: Request,
  res: Response,
) =>{
  try {
    const userId = req.params.userId;
    const inventory = await Inventory.findAll({
      where: {
        userId: userId
      }
    })
    res.status(200).json(inventory)
  } catch (error){
    res.status(400).json({ error: error instanceof Error ? error.message : "An error occurred while getting the inventory." });  
  }
}

export const updateInventory = async (
  req: Request, 
  res: Response,
) => {
  try{
    const {...data} = req.body;
    const inventoryId = req.params.inventoryId;
    const [updated] = await Inventory.update(data, {where: {id: inventoryId}});
    if (updated) {
      const updatedInventory = await Inventory.findByPk(inventoryId);
      res.status(200).json(updatedInventory);
    } else {
      res.status(404).json({ message: "Inventory not found" }); 
    }
  } catch (error) {
    res.status(400).json ({ error: error instanceof Error ? error.message : "An error occurred while updating the inventory." });
  }
  
}

export const deleteInventory = async (
  req: Request,
  res: Response,
) => {
  try {
    const inventoryId = req.params.inventoryId;
    const deleted = await Inventory.destroy({ where: { id: inventoryId}})
    if (deleted) {
      res.status(200).json({ message: "Inventory deleted successfully" });
    } else {
      res.status(404).json({ message: "Inventory not found" });
    }
  } catch (error) {
    res.status(400).json({
      error: error instanceof Error ? error.message : "An error occurred while deleting the inventory." 
    })
  }
}
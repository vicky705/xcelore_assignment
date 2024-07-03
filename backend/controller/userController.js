import UserModel from '../models/UserModel.js';
import bcryptjs from 'bcryptjs';
import Jwt from 'jsonwebtoken';
import { createError } from '../error.js';

export const createUser = async (req, res) => {
  try {
    const { email, firstName, password, lastName, isAdmin = false } = req.body;
    const salt = await bcryptjs.genSalt(10);
    const secPass = await bcryptjs.hash(password, salt);
    const emailExist = await UserModel.find({ email });
    if (emailExist.length === 0) {
      const data = await UserModel.create({
        firstName,
        email,
        lastName,
        isAdmin,
        password: secPass,
      });
      return res.status(201).json({ success: true, data });
    } else {
      return res
        .status(401)
        .json({ success: false, msg: "email already registered" });
    }
  } catch (error) {
    return res.status(500).json({ success: false, msg: error.message });
  }
};

export const createUserByAdmin = async (req, res) => {
  try {
    const { email, firstName, password, lastName, isAdmin = false } = req.body;
    const salt = await bcryptjs.genSalt(10);
    const secPass = await bcryptjs.hash(password, salt);
    const emailExist = await UserModel.find({ email });
    if (emailExist.length === 0) {
      const data = await UserModel.create({
        firstName,
        email,
        lastName,
        isAdmin,
        password: secPass,
      });
      return res.status(201).json({ success: true, data });
    } else {
      return res
        .status(401)
        .json({ success: false, msg: "email already registered" });
    }
  } catch (error) {
    return res.status(500).json({ success: false, msg: error.message });
  }
};

export const getUser = async (req, res, next) => {
  try {
    const user = await UserModel.findById(req.params.id);
    if (!user) {
      return next(createError(404, 'User not found'));
    }
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export const getUserList = async (req, res, next) => {
  try {
    const user = await UserModel.find();
    if (!user) {
      return next(createError(404, 'User not found'));
    }
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const updatedUser = await UserModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedUser) {
      return next(createError(404, 'User not found'));
    }
    res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
};

export const updateUserByAdmin = async (req, res, next) => {
  try {
    const { password, ...rest } = req.body;
    let updatedData = { ...rest };

    if (password) {
      const salt = await bcryptjs.genSalt(10);
      const secPass = await bcryptjs.hash(password, salt);
      updatedData.password = secPass;
    }

    const updatedUser = await UserModel.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return next(createError(404, 'User not found'));
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    if (!req.params || !req.params.id) {
      return next(createError(401, "Unauthorized: User not authenticated"));
    }
    const user = await UserModel.findById(req.params.id);
    if (!user) {
      return next(createError(404, 'User not found'));
    }
    await UserModel.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: 'User deleted successfully' });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const emailExist = await UserModel.findOne({ email });
    if (emailExist != null) {
      const comPass = await bcryptjs.compare(password, emailExist.password);
      if (comPass) {
        const payload = {
          userId: emailExist._id,
          isAdmin: emailExist.isAdmin ?? false,
        };
        const token = await Jwt.sign(payload, process.env.JWT_SEC_KEY);
        return res.status(200).json({ success: true, token, isAdmin: emailExist.isAdmin });
      } else {
        return res
          .status(409)
          .json({ success: false, msg: "Invalid Credentials" });
      }
    } else {
      return res.status(404).json({ success: false, msg: "User not found..." });
    }
  } catch (error) {
    return res.status(500).json({ success: false, msg: error.message });
  }
};

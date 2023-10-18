import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import UserModel from "../model/User.js";

export const register = async (req, res) => {
  try {
    const password = req.body.password;
    const hash = await bcrypt.hash(password, 10);

    const doc = new UserModel({
      email: req.body.email,
      fullName: req.body.fullName,
      avatarUrl: req.body.avatarUrl,
      passwortHash: hash,
    });

    const user = await doc.save();

    const token = jwt.sign(
      {
        _id: user._id,
      },
      "secret123",
      {
        expiresIn: "30d",
      }
    );

    const { passwortHash, ...userData } = user._doc;

    res.json({ ...userData, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Register is failed",
    });
  }
};

export const login = async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email });

    if (!user) {
      return req.status(404).json({
        message: "Login or password is incorrect",
      });
    }

    const isValidPass = await bcrypt.compare(
      req.body.password,
      user._doc.passwortHash
    );

    if (!isValidPass) {
      return res.status(404).json({
        message: "Login or password is incorrect",
      });
    }

    const token = jwt.sign(
      {
        _id: user._id,
      },
      "secret123",
      {
        expiresIn: "30d",
      }
    );

    const { passwortHash, ...userData } = user._doc;

    res.json({ ...userData, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Login is failed",
    });
  }
};

export const getUser = async (req, res) => {
  try {
    const user = await UserModel.findById(req.userId);

    if (!user) {
      return res.status(404).json({
        message: "User is not found",
      });
    }

    const { passwortHash, ...userData } = user._doc;

    res.json({ ...userData });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "No access",
    });
  }
};

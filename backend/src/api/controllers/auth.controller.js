import Company from "../models/Company.model.js";
import User from "../models/User.model.js";
import createError from "../utils/createError.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res, next) => {
  try {
    const hash = bcrypt.hashSync(req.body.password, 5);
    const newUser = new User({
      ...req.body,
      password: hash,
      role: "user",
    });

    await newUser.save();
    res.status(201).send({ message: "User has been created." });
  } catch (err) {
    next(err);
  }
};
export const login = async (req, res, next) => {
  console.log(req.body.email);
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) return next(createError(404, "User not found!"));

    const isCorrect = bcrypt.compareSync(req.body.password, user.password);
    if (!isCorrect)
      return next(createError(400, "Wrong password or username!"));

    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_KEY,
      { expiresIn: "60d" }
    );
    const { password, ...info } = user._doc;
    // console.log("user ID : ", req.userId)
    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .send(info);
  } catch (err) {
    next(err);
  }
};

export const logout = async (req, res) => {
  res
    .clearCookie("access_token", {
      sameSite: "none",
      secure: true,
    })
    .status(200)
    .send("User has been logged out.");
};

export const registerCompany = async (req, res, next) => {
  console.log(req.body);
  //#FIXME role must be in [client, company, employee, admin]
  try {
    const hashedPassword = bcrypt.hashSync(req.body.password, 5);
    const new_company = new User({
      ...req.body,
      role: "company",
      status: "pending",
      password: hashedPassword,
    });

    await new_company.save();
    res.status(201).send({ message: "Compnay has been created." });
  } catch (err) {
    next(err);
  }
};

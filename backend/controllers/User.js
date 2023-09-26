import UserModel from "../models/User.js";
import bycrpt from "bcrypt";
import Jwt from "jsonwebtoken";
class UserController {
  // create user
  static createUser = async (req, res) => {
    const { name, email, password, phone, date } = req.body;
    console.log(req.body);
    const user = await UserModel.findOne({ email: email });
    if (user) {
      res.send({ status: "failed", message: "email already exists" });
    } else {
      if (name && email && password && phone) {
        try {
          const salt = await bycrpt.genSalt(10);
          const hashPassword = await bycrpt.hash(password, salt);
          const doc = new UserModel({
            name,
            email,
            password: hashPassword,
            phone,
            date,
          });
          await doc.save();
          console.log("user created");
          const saved_user = await UserModel.findOne({ email: email });
          // generating jwt token
          const token = Jwt.sign(
            { userId: saved_user._id },
            process.env.JWT_SECRETKEY,
            { expiresIn: "1d" }
          );
          res.status(201).send({
            status: "success",
            message: "register created",
            token: token,
          });
        } catch (error) {}
      } else {
        res.send({ status: "failed", message: "all fields required" });
      }
    }
  };

  // user login
  static userLogin = async (req, res) => {
    try {
      const { email, password } = req.body;

      if (email && password) {
        const user = await UserModel.findOne({ email: email });
        if (user) {
          const isMatch = await bycrpt.compare(password, user.password);
          if (user.email === email && isMatch) {
            //generating token
            const token = Jwt.sign(
              { userId: user._id },
              process.env.JWT_SECRETKEY,
              { expiresIn: "1d" }
            );
            res.send({
              status: "ok",
              message: "logged in",
              token: token,
              name: user.name,
              phone: user.phone,
            });
          } else {
            res.send({
              status: "failed",
              message: "email or passworddhidjs wrong",
            });
          }
        } else {
          res.send({ status: "failed", message: "yu aint register" });
        }
      } else {
        res.send({ status: "failed", message: "all fields required" });
      }
    } catch (error) {
      console.log(error);
    }
  };
}
export default UserController;

// try {
//   // Check if user already exists
//   let user = await UserModel.findOne({ email });

//   if (user) {
//     return res.status(400).json({ msg: 'User already exists' });
//   }

//   // Create new user
//   const newUser = new UserModel({
//     name,
//     email,
//     password,
//     phone
//   });

//   // Save user to database
//  const result =  await newUser.save();

//   res.json({ msg: 'User created successfully' });
// } catch (err) {
//   console.error(err.message);
//   res.status(500).json({ msg: 'Server error' });
// }

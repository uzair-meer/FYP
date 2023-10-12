import User from "../models/User.model.js";
// userController.js

// Create a function to handle user registration
export const registerUser = async (req, res) => {
  try {
    // Extract user data from the request body
    const { name, email, password, role, phone } = req.body;

    // Check if the email is already in use
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "Email is already registered" });
    }

    // Hash the password
    // const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user instance
    const newUser = new User({
      name,
      email,
      password,
      role,
      phone,
    });

    // Save the user to the database
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export async function postLogin(req, res, next) {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email: email });

    //? check email
    if (!user) {
      res
        .status(400)
        .json({ status: "error", message: "email is not correct" });
      return;
    }
    //? match passwords
    if (user.password !== password) {
      res
        .status(422)
        .json({ status: "error", message: "passwords are not matched" });
      return;
    }

    res.status(200).json({
      status: "ok",
      data: {
        userId: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone,
      },
    });
  } catch (error) {
    next(error);
  }
}

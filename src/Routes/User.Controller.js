/** @format */

const userSchema = require("../Models/User");
const { v4: uuidv4 } = require("uuid"); // Importing UUID library

const userRegister = async (req, res) => {
  const { email } = req.body;
  console.log("req.body:", req.body);

  try {
    const existingUser = await userSchema.findOne({ email });

    let user;
    let userExists = false;

    if (!existingUser) {
      const uniqueID = uuidv4(); // Generate a unique ID

      // Create a new user object with the email and uniqueID
      user = await userSchema.create({
        ...req.body,
        UId: uniqueID, // Save the unique ID in the database
      });

      console.log("User created:", user);
    } else {
      // If the user exists, assign existing user data to `user`
      user = existingUser;
      userExists = true;
    }

    // Respond with the user data and existence status
    res.status(200).json({
      status: "Success",
      data: user,
      exists: userExists, // Include the `exists` status in the response
    });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({
      status: "Failed",
      message: "An error occurred while registering the user",
    });
  }
};

const getUser = async (req, res) => {
  const { email, uniqueId } = req.body;
  console.log("object", req.body);
  if (!email && !uniqueId) {
    return res.status(400).json({
      status: "Failed",
      message: "Please provide either an email or uniqueId.",
    });
  }

  try {
    const user = await userSchema.findOne({
      $or: [{ email }, { UId: uniqueId }],
    });

    if (!user) {
      return res.status(404).json({
        status: "Failed",
        message: "User not found",
      });
    }
    res.status(200).json({
      status: "Success",
      data: user,
    });
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({
      status: "Failed",
      message: "An error occurred while fetching the user data",
    });
  }
};

const CheckUser = async (req, res) => {
  const { uniqueId } = req.params;

  try {
    const user = await userSchema.findOne({ UID: uniqueId });

    if (user) {
      return res.json({ exists: true, user: user });
    } else {
      return res.json({ exists: false });
    }
  } catch (error) {
    console.error("Error in CheckUser API:", error);
    return res.status(500).json({ error: "Server Error" });
  }
};

const updatePoints = async (req, res) => {
  const { uniqueId } = req.body;

  try {
    const user = await userSchema.findOne({ UID: uniqueId });
    if (user) {
      user.userPoints += 1;
      await user.save();
      return res.json({ success: true });
    } else {
      return res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server Error" });
  }
};

module.exports = {
  userRegister,
  getUser,
  CheckUser,
  updatePoints,
};

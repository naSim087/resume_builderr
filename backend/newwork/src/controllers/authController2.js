const UserModel= require("../models/userModel.js");
const  bcrypt= require( "bcrypt");
const jwt =require("jsonwebtoken");


const registerUser = async (req, res) => {
  // console.log("Register");
  const salt = await bcrypt.genSalt(10);
  const hashedPass = await bcrypt.hash(req.body.password, salt);
  req.body.password = hashedPass
  const newUser = new UserModel(req.body);
  // console.log(newUser);
  const {username} = req.body
  // console.log(username);
  try {
    
    const oldUser = await UserModel.findOne({ username });

    if (oldUser)
      return res.status(400).json({ message: "User already exists" });

    // console.log( oldUser);
    const user = await newUser.save();
    // console.log(user);
    const token = jwt.sign(
      { username: user.username, id: user._id },
      process.env.SECRETKEY,
      { expiresIn: "1h" }
    );

    res.status(200).json({ user, token });
  } catch (error) {

    res.status(500).json({ message: error.message });
  }
};




 const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await UserModel.findOne({ username: username });
      // console.log(user);
    if (user) {
      const validity = await bcrypt.compare(password, user.password);
        // console.log(validity);
      if (!validity) {
        res.status(400).json("wrong password");
      } else {
        const token = jwt.sign(
          { username: user.username, id: user._id },
          process.env.SECRETKEY,
          { expiresIn: "1h" }
        );
        res.status(200).json({ user, token });
      }
    } else {
      res.status(404).json("User not found");
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = { registerUser, loginUser };
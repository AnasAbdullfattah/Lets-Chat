import User from "../model/user.model.js";
import bcrypt from "bcryptjs";
import {generateToken} from "../lib/utils.js"

export const signup = async (req, res) => {
  const {name, mail, password} = req.body;
  try {
    if (password.length < 6) {
      return res.status(400).json({ 
        message: "Password must be at least 6 characters long"
      });
      
    }

      const user = await User.findOne({email});
      if (user) {
        return res.status(400).json({
          message: "this mail already exists"
        });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password,salt);
      const newUser = new User({
        name,
        mail,
        password: hashedPassword 
      });

      if (newUser) {
        generateToken(newUser._id, res )
        await newUser.save();
        res.status(201).json({
          _id: newUser._id,
          name: newUser.name,
          mail: newUser.mail,
          profilePic: newUser.profilePic,
          message: "Well done"})
      } else {
        res.status(400).json({message: "there is a problem with data"})
        
      }
    
  } catch (error) {
        console.error(error.message);
        res.status(500).json({message: "there is a problem from our side"})
    
  }

};

export const login = (req, res) => {
  res.send("Let's Chaaaaaaaaat Login");
};

export const logout = (req, res) => {
  res.send("Let's Chaaaaaaaaat logout");
};

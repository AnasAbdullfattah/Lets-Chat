import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import {generateToken} from "../lib/utils.js"
import cloudinary from "../lib/cloudinary.js"

export const signup = async (req, res) => {
  const {name, mail, password} = req.body;
  try {
    if (!name || !mail || password) {

      res.status(400).json({message: "recheck you data"});
      
    }
    if (password.length < 6) {
      return res.status(400).json({ 
        message: "Password must be at least 6 characters long"
      });
      
    }

      const user = await User.findOne({mail});
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

export const login = async (req, res) => {
  
  const {mail, password} = res.body;
  try {
    if (!mail || !password) {
      res.status(400).json({message: "recheck you data"});
    }
    const isMailValid = await findOne({mail});
    if (!isMailValid) {
      res.status(400).json({message: "there is a problem"});
    }
   const isPasswordCorrect = await bcrypt.compare(password,user.password)
   if (!isPasswordCorrect) {
      res.status(400).json({message: "there is a problem"});
   }

   generateToken(user._id,res)
      res.status(200).json({message: "there is Nice you are in"});

  } catch (error) {
      res.status(500).json({message: "there is a problem"});
    
  }

};

export const logout = (req, res) => {
try {
  
  res.cookie ("jwt", "", {maxAge:0})
  res.status(200).json({message: "there is Nice you are out"});
} catch (error) {
      res.status(500).json({message: "there is a problem"});
  
}
};


export const updateProfile = async (req, res) => {

try {
    const { profilePic } = req.body;
  const uerID = req.user._Id;

  if (!profilePic) {
    res.status(400).json({message: "sir there is a problem recheck please"});
    
  }

  const uploadResponse = await cloudinary.uploader.upload(profilePic);
  const updateUser = await User.findByIdAndUpdate(userId, {profilePic:uploadResponse.secure_url}, {new:true})
  res.status(200).json(updateUser)
} catch (error) {
  console.error(error)
  res.status(400).json({message: "there is an error"})

}
}

export const checkAuth = async (req, res) => {

  try {
    res.status(200).json(req.user);
    
  } catch (error) {
    console.error(error);
    res.status(400).json({message: "there is a big problem"});
  }
}
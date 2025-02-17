import User from "../models/user.model.js";
import generateToken from "../utils/generateToken.js";

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
  
    if (!existingUser) {
      return res.status(404).json({ success: false, error: "User not exist" });
    }

    const isMatch = await existingUser.comparePassword(password);

    if (!isMatch) {
      return res
        .status(400)
        .json({ error: "Enter correct password", success: false });
    }

    const token = generateToken(existingUser._id);
    res.cookie("token", token, {
      httpOnly:true,//more secure cannot access by client side js
      secure: process.env.NODE_ENV === "production", 
        maxAge:15*24*60*60*1000, //15 days
        sameSite:"strict", 
    });

    return res.status(200).json({ success: true, message: "Login Successful",user:existingUser });
  } catch (error) {
    console.log("Error in login controller", error.message);
    return res.status(500).json("Internal server error in login controller");
  }
};
export const signupUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!password) {
      return res.status(400).json({ success: false, error: "Password must required"});
       
    }
    if (user)
      return res
        .status(200)
        .json({ success: false, error: "User already exist" });

    user = await User.create({ name, email, password });

    const token = generateToken(user._id);

    res.cookie("token", token, {
      httpOnly:false,//more secure cannot access by client side js
      secure: process.env.NODE_ENV === "production", 
      maxAge:15*24*60*60*1000, //15 days
      sameSite:"strict",  //1 hr
    });

    return res
      .status(201)
      .json({
        success: true,
        message: "User registered Successfully",
        
        user: { id: user._id, name, email },
      });
  } catch (error) {
    let errorMessage="An error occured";
    if(error.name==="ValidationError"){
      errorMessage=Object.values(error.errors).map(err=>err.message);
      return res.status(400).json({errors:errorMessage});
    }

  if(error.code===11000){
    return res.status(400).json({error:"Email is already registered"})
  }
    console.log("error in signup controller");
    return res.status(500).json({ success: false, error: error.message });
  }
};


export const logoutUser=async(req,res)=>{

try {
    
    res.cookie("token","",{
        httpOnly:false,
        expires:new Date(0),
        secure:process.env.NODE_ENV==="production",
        sameSite:process.env.NODE_ENV==="production"?"Strict":"Lax",
    })
    return res.status(200).json({success:true,message:"Logged out successfully"});
    
} catch (error) {
    console.log("error in logout controller");
    return res.status(500).json({success:false,error:error.message})
}
}
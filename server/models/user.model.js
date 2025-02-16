import mongoose from "mongoose";
import bcrypt from "bcryptjs"

const userSchema = new mongoose.Schema({
  name:{
    type:String,
    required:[true,"Name is required"],
    minlength:[3,"Name must be at least 3 characters"],
    maxlength:[50,"Name cannot exceed 50 characters"],
    trim:true
  },
  email: {
    type: String,
    required: [true,"Email is required"],
    unique:true,
    lowercase:true,
    match:[/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,"Enter a valid email address"],
  },
  password: {
    type: String,
    required: [true,"Password is required"],
    minlength:[8,"Password must be at least 8 characters long"],
    validate:{
      validator:function(value){
        return /[A-Z]/.test(value)&&/\d/.test(value)
      },
      message:"Password must contain at least one uppercase letter and one number",
    }
    
  },
});

userSchema.pre("save",async function(next){
    if(!this.isModified("password"))return next();
    this.password=await bcrypt.hash(this.password,10);
    next();
})

userSchema.methods.comparePassword=async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password);
};

const User = mongoose.model("User", userSchema);
export default User;

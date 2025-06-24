import User from '../models/User'
import bcrypt from 'bcrypt'
export const register=async(req,res)=>{
    try{
const{name,email,password}=req.body
const existingUser=await User.findOne({email})
if(existingUser) return res.status(400).json({message:'User already exists'})
const hashedPassword=await bcrypt.hash(password,10)
const newUser=await User.create({
    name,
    email,
    password:hashedPassword
})

const token=jwt.sign(
    {id:newUser._id,email:newUser.email},
    process.env.JWT_secret,
    { expiresIn:'7d'}
);
res.status(201).json({user:newUser,token})
    }
catch(err){
    res.status(500).json({ message:'Server Error', error:err.message})
}
}

export const login=async(req,res)=>{
    try{
        const {email,password}=req.body
        const user= await User.findOne({email})
        if(!user)return res.status(401).json({message:'User not found'})
        const isMatch=bcrypt.compare(password,user.password)
        if(!isMatch)return res.status(401).json({message:'Invalid credentials'})
        
        const token=jwt.sign(
            {id:user._id,email:user.email},
            process.env.JWT_secret,
            {expiresIn:'7d'}
        )
        return res.status(200).json({user,token})
    }
    catch(err){
    res.status(500).json({ message:'Server Error', error:err.message})
}
}
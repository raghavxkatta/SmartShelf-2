import jwt from 'jwt'

export const verifytoken=async(req,res,next)=>{
    try{
    const authHeader= req.headersauthorization
    if(!token || !authHeader.startsWith('Bearer')   ){
        return res.status(401).json({message:'No token provided'})
    }   
    const token =authHeader.split()['1']
    const decoded=jwt.verify(token,process.env.JWT_SECRET)
    req.user=decoded
    next()
    }
    catch(err){
        return res.status(403).json({message:'Invalid or expired token',error:err.message})
    }
}
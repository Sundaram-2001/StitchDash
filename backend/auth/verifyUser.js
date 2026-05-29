import {supabaseAdmin} from "../db/db"

export const verifyUser=async(req,res,next)=>{
    try {
        const authHeader=req.headers.authorization
        if(!authHeader){
            return res.status(401).json({
                error: "Access Denied. Missing or malformed authorization token."
            })
        }
        const token=authHeader.split(" ")[1]
        const {data:{user},error}=await supabaseAdmin.auth.getUser(token)
        if (error || !user) {
        console.error("Token verification failed:", error?.message || "Invalid Session");
        return res.status(401).json({ 
        error: "Session expired or invalid token. Please log in again." 
        });
    }
    req.user=user
    next()
    } catch (err) {
        console.error("Critical authentication error",err)
        return res.status(500).json({
            error:"Internal Error in verifying the user!"
        })
    }
}
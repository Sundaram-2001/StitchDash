import express from "express";
import { verifyUser } from "../auth/verifyUser.js";
import { supabaseAdmin } from "../db/db.js";

const routes = express.Router();

routes.get("/test", (req, res) => {
    return res.status(200).json({
    message: "all ok"
    });
});

routes.post("/customer-onboard",verifyUser,async(req,res)=>{
    const verifiedUser=req.user
    const {name,email,phoneNumber,address}=req.body

    if(!name || !email || !phoneNumber || !address){
        return res.status(400).json({
            error:"You missed a field, kindly enter all the fields!"
        })
    }try
    {const {data,error}=await supabaseAdmin.
    from("users")
    .insert([
        {id:verifiedUser.id,
            name,
            email,
            address,
            account_type:"customer",
            phoneNumber
        }

    ])
    if(error){
        console.log("Unexpected Error while seting up profile:",error)
        return res.status(500).json({
            error:"Something went wrong!"
        })
    }
    return res.status(200).json({
        message:"Onboarding successful!"
    })
    }
    catch(err){
        console.error("Erro occured:",err)
        return res.status(500).json({
            error:"Internal Server Error!"
        })
    }
})  
export default routes;
import express from "express"
const app=express()

app.get("/test",(req,res)=>{
    res.send("working fine")
})
app.listen(8080,()=>{
    console.log("Server ready to start")
})
import express from "express"
import routes from "./routes/routes.js"
import bodyParser from "body-parser"

const app=express()

app.use(express.json())
app.use("/api/v1",routes)
app.listen(8080,"0.0.0.0",()=>{
    console.log("Server ready to start 8080")
})
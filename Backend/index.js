import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

const server = express();
const port = 3000;

server.use(cors());
server.use(bodyParser.json());

// data from frontend is received as --> req
// data to be sent from backend is sent as --> res
server.post("/demo",(req,res)=>{
    console.log(req.body)

})


server.listen({port},()=>{
    console.log(`Server is running on port ${port}`)
});


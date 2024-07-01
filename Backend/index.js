import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";


const server = express();
const port = 3000;

//connecting mongodb
const db = mongoose;
main().catch(err => console.log(err));

async function main() {
  await db.connect('mongodb://127.0.0.1:27017/docs');
  console.log("db connected");

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

// creating schema
const userSchema = new db.Schema({
    email: String,
    username: String,
    password : String

  });

//creating model
const User = db.model('User', userSchema);
// User will act as a class



server.use(cors());
server.use(bodyParser.json());

// data from frontend is received as --> req
// data to be sent from backend is sent as --> res

// creating database
server.post("/",async(req,res)=>{

    // creating object of mongodb class 'User'
    let user = new User();
    user.email = req.body.Email;
    user.username = req.body.Username;
    user.password = req.body.Password;
    // save function
    const doc = await user.save();

    console.log(doc);
    // res.json(doc);
    


})

server.get('/',async(req,res)=>{
    const db_items =  await User.find({})
    //sending to frontend
    res.json(db_items);
})

server.listen({port},()=>{
    console.log(`Server is running on port ${port}`)
});


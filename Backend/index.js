import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import bcrypt from "bcrypt";


const server = express();
const port = 3000;


const encrypt = bcrypt;
const saltRounds = 10;

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

//encrypting username and password



// creating database
server.post("/signup",async(req,res)=>{
  // en_ denotes encrypted
  const en_email = encrypt.hashSync(req.body.Email,saltRounds)
  // const en_username = encrypt.hashSync(req.body.Username,saltRounds)
  const en_password = encrypt.hashSync(req.body.Password,saltRounds)


  



    // creating object of mongodb class 'User'
    let user = new User();

  
    user.email = en_email;
    user.username = req.body.Username;
    user.password = en_password;
    // save function
    const doc = await user.save();
    console.log("Registered Successfully")

    console.log(doc);
    res.json(doc);

})
    



server.post('/login',async(req,res)=>{
  // console.log(req.body)
  

  const db_item =  await User.findOne({
  
      username : req.body.log_username,
      
    });
    // console.log(db_item.password)

    const match = encrypt.compareSync(req.body.log_password,db_item.password)

    if(match){
      console.log("authenticated")
    }

    else{
      console.log("Invalid Username or Password")
    }

    
    // //sending to frontend
    res.send(req.body.log_username);
})
server.listen({port},()=>{
    console.log(`Server is running on port ${port}`)
});


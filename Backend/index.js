import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import Profile from "./models/Profile.js";
import User from "./models/User.js";
import Password from "./models/Password.js";
import { ObjectId } from "mongodb";

const server = express();
const port = 3000;
let user;
let db_item;
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


server.use(cors());
server.use(bodyParser.json());

// data from frontend is received as --> req
// data to be sent from backend is sent as --> res
//encrypting username and password



// creating database
server.post("/signup", async (req, res) => {

  let existing_username;
  let existing_email;
  let send_msg;
  let existing_user;


  try {
    existing_username = await User.findOne({
      username: req.body.Username

    });
  } catch (err) {
    console.log(err);
  }

  try {
    existing_email = await User.findOne({
      username: req.body.Email

    });
  } catch (err) {
    console.log(err);
  }

  try {

    existing_user = await User.findOne({
      email: req.body.Email,
      username: req.body.Username
    })

  } catch (err) {
    console.log(err);
  }

  if (existing_user) {
    console.log("User Already Exists");
    send_msg = "Error 101";
    res.send(send_msg);
  }

  else if (existing_username || existing_email) {
    console.log("Username/Email already taken");
    send_msg = "Error 102";
    res.send(send_msg);
  }

  else {
    // en_ denotes encrypted
    // const en_email = encrypt.hashSync(req.body.Email, saltRounds)
    // // const en_username = encrypt.hashSync(req.body.Username,saltRounds)
    const en_password = encrypt.hashSync(req.body.Password, saltRounds)


    let doc;

    try {
      // creating object of mongodb class 'User'
      user = new User();
      // user._id = new mongoose.Types.ObjectId(),
      user.email = req.body.Email;
      user.username = req.body.Username;
      user.password = en_password;
      // save function
      doc = await user.save();
    } catch (err) {
      console.log(err);
    }

    console.log("Go 401")
    send_msg = "Registered Successfully";
    console.log(doc);
    res.send(send_msg)
  }
})




server.post('/login', async (req, res) => {
  const user = JSON.stringify(req.body.username)
  const pass = JSON.stringify(req.body.password)

  // empty string has length = 2


  if (user.length > 2 && pass.length > 2) {

    try {
      db_item = await User.findOne({

        username: req.body.username

      }
      );
    } catch (err) {
      console.log(err);
    }

    let match;


    if (db_item) {


      match = encrypt.compareSync(req.body.password, db_item.password)

    }

    if (match) {
      console.log("authenticated")
      // res.send(req.body.username);
      res.send(db_item);

    }

    else {
      res.send("Invalid");
      console.log("Invalid Username or Password");
    }

  }

  

  else {
    console.log("Input Fields are empty")
    res.sendStatus(401);
  }
})




server.get("/card-add-passwords", async (req, res) => {

  const result = await User.findOne({
    _id: req.query.user_id

  }).populate('linked_Pass');
  res.json(result);
  // console.log(result);


})


server.put("/card-add-passwords/:id", async (req, res) => 
{
  console.log("In Put request");
  console.log(req.body.pass_id);
  // res.json(req.params.id);
  let doc;
  

  try {
    doc = await User.findOneAndUpdate(
      {
        _id: req.params.id
      },
      
      { $push: { linked_Pass: req.body.pass_id } },
      { new: true })
  } catch (err) {
    throw err;
  }

  res.json(doc);
 

})




server.put("/card-add-passwords/:id/update", (req, res) => {

  const password_array = req.body.updated_info;
 
  const id = req.body.updated_info._id;

  const update_password = async (id, data) => {
    console.log(id);
    console.log(data);
    // 
    try {
      const update = await Password.findOneAndUpdate(
        { _id: id },          // Filter to find the document
        { $set: data },    // Use $set to update the fields
        { new: true },

      );
      console.log(update);
      res.json(update);


    } catch (err) {
      console.log(err);
    }
  }


  update_password(id, password_array);

})

server.post("/card-add-passwords/:id/delete", async(req, res) => {
  // const deleted_array = req.body.deleted;
  

  let id = await req.body;
  console.log(id);
  
  // let user_profile_id = req.params.id;

  console.log(id);
  // console.log(user_profile_id);







  
  
  const delete_password = async (identifier1,identifier2) => {
    try {

      const deleting = await Password.findOneAndDelete(
        {
          _id : identifier1
        }


      );

      const data_from_user = await User.findOneAndUpdate({
        
          _id:identifier2},
          {$pull:{linked_Pass : identifier1}
        },
        {new:true}
        
      )

      console.log(data_from_user);
  
      // console.log(data_from_user);

    } catch (err) {
      console.log(err);
    }

  }

  // delete_password(id,user_profile_id);

  


});

server.post("/card-add-passwords", async (req, res) => {
  try {

    let pass_list = new Password();
    pass_list.website = req.body.website;
    pass_list.username = req.body.username;
    pass_list.password = req.body.password;


    console.log("Registered Successfully");

    // now obtaining the id of password registered

    const doc = await pass_list.save();
    res.json(doc);
  }

  catch (err) {
    console.log(err);
  }

})



//Working with profile model of mongodb

server.post("/login-successful/user-personal-info/:id",async(req,res) =>
{
  try
  {
    console.log(req.body);
    const user_profile = new Profile();
    user_profile.firstName = req.body.firstName;
    user_profile.lastName = req.body.lastName;
    user_profile.contacts = req.body.contacts;

    const done = await user_profile.save();
    
  }

  catch(err)
  {
    if(err) throw err;
  }
});


server.listen({ port }, () => {
  console.log(`Server is running on port ${port}`)
});


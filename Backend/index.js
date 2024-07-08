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
  password: String

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
server.post("/signup", async (req, res) => {

  let existing_username;
  let existing_email;


  try {
    existing_username = await User.findOne({
      username: req.body.Username
      
    });
  } catch (err) {
    console.log(err);
  }

  try {
    existing_email = await User.findOne({
      email: req.body.Email
      
    });
  } catch (err) {
    console.log(err);
  }




  if (existing_username && existing_email) {
   console.log("User already Exists");
   res.send("User already exists")

    
  }

  else if (existing_email || existing_username) {
    console.log("Username/Email already taken");

    // checking if user already exists in database
  }



  else {


    // en_ denotes encrypted
    // const en_email = encrypt.hashSync(req.body.Email, saltRounds)
    // // const en_username = encrypt.hashSync(req.body.Username,saltRounds)
    const en_password = encrypt.hashSync(req.body.Password, saltRounds)



    let doc;

    try {
      // creating object of mongodb class 'User'
      let user = new User();

      user.email = req.body.Email;
      user.username = req.body.Username;
      user.password = en_password;
      // save function
      doc = await user.save();
    } catch (err) {
      console.log(err);
    }

    console.log("Registered Successfully")
    console.log(doc);
    res.send("Registered Successfully")
  }
})




server.post('/login', async (req, res) => {
  const user = JSON.stringify(req.body.username)
  const pass = JSON.stringify(req.body.password)

  // empty string has length = 2
  let db_item;

  if (user.length > 2 && pass.length > 2) {

    try {
      db_item = await User.findOne({

        username: req.body.username

      });
    } catch (err) {
      console.log(err);
    }

    let match;

    if (db_item) {

      match = encrypt.compareSync(req.body.password, db_item.password)

    }

    if (match) {
      console.log("authenticated")
      res.send(req.body.username);
    }

    else {
      console.log("Invalid Username or Password")



    }

  }

  // }

  else {
    console.log("Input Fields are empty")
    res.sendStatus(401);




  }
}
)








server.get("/login", (req, res) => {
  res.send("Hello");
})
server.listen({ port }, () => {
  console.log(`Server is running on port ${port}`)
});


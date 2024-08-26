import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import Profile from "./models/Profile.js";
import User from "./models/User.js";
import Password from "./models/Password.js";
import crypto, { createCipheriv } from "crypto";





const algorithm = 'aes-256-cbc';
const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);


function encrypt(plaintext, key, iv) {
  const cipher = createCipheriv(algorithm, key, iv);
  let encryptedData = cipher.update(plaintext, "utf-8", "hex");
  encryptedData += cipher.final("hex");
  const base64iv = Buffer.from(iv, 'binary').toString('base64');
  const base64key = Buffer.from(key, 'binary').toString('base64');
  return {
    iv: base64iv,
    encryptedData: encryptedData,
    key: base64key
  };
}


function decrypt(ciphertext, key, iv) {
  const original_key = Buffer.from(key, 'base64');
  const original_iv = Buffer.from(iv, 'base64');
  const decipher = crypto.createDecipheriv(algorithm, original_key, original_iv);
  let decryptedData = decipher.update(ciphertext, "hex", "utf-8");
  decryptedData += decipher.final("utf-8");

  return decryptedData;
}







const server = express();
const port = 3000;
let user;
let db_item;
const hash = bcrypt;
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

    const en_password = hash.hashSync(req.body.Password, saltRounds)


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


      match = hash.compareSync(req.body.password, db_item.password)

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

  if (result) {
    const user_passwords = result.linked_Pass;

    // console.log(decrypt(user_passwords.password,user_passwords.key,user_passwords.iv));

    //user_passwords is a password array

    user_passwords.forEach(entries => {

      const decrypted_password = decrypt(entries.password, entries.key, entries.iv);
      entries.password = decrypted_password;
    })

    console.log(user_passwords);
    res.send(user_passwords);

  }



})


server.put("/card-add-passwords/:id", async (req, res) => {
  console.log("In Put request");

  // res.json(req.params.id);
  let doc;


  try {
    doc = await User.findOneAndUpdate(
      {
        _id: req.params.id
      },

      { $push: { linked_Pass: req.body.post } },
      { new: true })
  } catch (err) {
    throw err;
  }

  res.json(doc);


})




server.put("/card-add-passwords/:id/update", (req, res) => {

  const password_array = req.body.updated_info;

  console.log(password_array);
  console.log("Before Encryption");

  const updated_encryption = encrypt(password_array.password,key,iv);

  password_array.password = updated_encryption.encryptedData;
  password_array.iv = updated_encryption.iv;
  password_array.key = updated_encryption.key;

  console.log(password_array);

 

  const id = req.body.updated_info._id;

  const update_password = async (id, data) => {
    
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

server.delete("/card-add-passwords/:id/delete/:pass_id", async (req, res) => {

  const user_profile_id = req.params.id;
  const paasword_id = req.params.pass_id;







  const delete_password = async (identifier1, identifier2) => {
    try {

      const deleting = await Password.findOneAndDelete(
        {
          _id: identifier1
        }


      );

      const data_from_user = await User.findOneAndUpdate({

        _id: identifier2
      },
        {
          $pull: { linked_Pass: identifier1 }
        },
        { new: true }

      )



      // console.log(data_from_user);

    } catch (err) {
      console.log(err);
    }

  }

  delete_password(paasword_id, user_profile_id);




});

server.post("/card-add-passwords", async (req, res) => {
  try {



    const encrypted_password = encrypt(req.body.password, key, iv);
    console.log(encrypted_password);



    let pass_list = new Password();
    pass_list.website = req.body.website;
    pass_list.username = req.body.username;
    pass_list.password = encrypted_password.encryptedData;
    pass_list.iv = encrypted_password.iv;
    pass_list.key = encrypted_password.key;


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

server.post("/login-successful/user-personal-info/:id", async (req, res) => {

  try {

    const user_profile = new Profile();
    user_profile.firstName = req.body.firstName;
    user_profile.lastName = req.body.lastName;
    user_profile.contacts = req.body.contacts;

    const done = await user_profile.save();
    res.json(done);

  }

  catch (err) {
    if (err)
      console.log(err);
  }
});


server.put("/login-successful/user-personal-info/:id/:person_id", async (req, res) => {


  try {
    const docs = await User.findOneAndUpdate(
      {
        _id: req.params.id
      },

      { personal_details: req.params.person_id },
      { new: true })


  } catch (err) {
    throw err;
  }



}
)


server.get("/login-successful/user-personal-info/:id", async (req, res) => {
  const u_id = req.params.id;
  const get_result = await User.findOneAndUpdate(
    {
      _id: u_id
    })
    .populate('personal_details')
    .populate('password')

  console.log(get_result);


  res.json(get_result);


})


server.listen({ port }, () => {
  console.log(`Server is running on port ${port}`)
});


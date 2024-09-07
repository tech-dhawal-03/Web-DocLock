import mongoose, { Schema } from "mongoose";

const userSchema = new mongoose.Schema({

    email: String,
    username: String,
    password: String,
    linked_Pass: [{
      type: Schema.Types.ObjectId,
      ref: 'Password'
    }],
    
    personal_details : {
      type : Schema.Types.ObjectId,
      ref : 'Profile'
    }
  },
    {
      timestamps: true
    });


const User = mongoose.model('User', userSchema);

export default User;
import mongoose, { Schema } from "mongoose";

const userSchema = new mongoose.Schema({

    email: String,
    username: String,
    password: String,
    linked_Pass: [{
      type: Schema.Types.ObjectId,
      ref: 'Password'
    }]
  },
    {
      timestamps: true
    });


const User = mongoose.model('User', userSchema);

export default User;
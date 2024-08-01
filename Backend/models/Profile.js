import mongoose from "mongoose";
import { buffer } from "stream/consumers";

const profileSchema = new mongoose.Schema({

    profile_pic : {
        type : buffer
    }, 

    first_name : {
        type: String,
        required : true,
    },

    last_name : {
        type : String,
        required : true
    },

    contacts : {
        type : Number,
    },

    email : {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },

    username : {
        type: Schema.Types.ObjectId,
        ref: 'User'
    
    },

    password : {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }

})

module.exports = mongoose.model('Profile',profileSchema);
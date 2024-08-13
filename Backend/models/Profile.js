import mongoose, { Schema } from "mongoose";


const profileSchema = new mongoose.Schema({

    profile_pic : {
        type : String,
    }, 

    firstName : {
        type: String,
        required : true,
    },

    lastName : {
        type : String,
        required : true
    },

    contacts : {
        type : Number,
    },

    password : {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }

})

const Profile = mongoose.model("Profile",profileSchema);

export default Profile;
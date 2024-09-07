import mongoose from "mongoose";

const passwordSchema = new mongoose.Schema(
{
    website: String,
    username: String,
    password: String,
    iv : String,
    key : String
    
    
},
{
    timestamps: true
}
)


const Password = mongoose.model('Password', passwordSchema);
export default Password;

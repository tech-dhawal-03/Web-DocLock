import mongoose from "mongoose";

const docsSchema = new mongoose.Schema(
{
    fileName : {type : String, required : true},
    category : {type : String},
    dateUploaded : {type : Date, default :Date.now},
    url : {type : String, required : true},
    fileType : {type : String},
    fileSize : {type : Number},
    description : {type : String}    
    
},


{
    timestamps: true
}
)


const File = mongoose.model('Document', docsSchema);
export default File;

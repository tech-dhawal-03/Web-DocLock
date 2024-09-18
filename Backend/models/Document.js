import mongoose from "mongoose";

const docsSchema = new mongoose.Schema(
{
    fileData : Buffer,
    fileType : String,
    fileName : String  
    
},
{
    timestamps: true
}
)


const Document = mongoose.model('Document', docsSchema);
export default Document;

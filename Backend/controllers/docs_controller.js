import User from "../models/User.js";
import File from "../models/File.js";
import fs from 'fs';
import path from "path";
import { fileURLToPath } from "url";




const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename)







export const postCategory = async(req,res)=>{
    console.log(req.body._id)

    try{
        const data = await User.findOneAndUpdate(
            {
                _id : req.params.id
            },

            {
                $push : {
                    docs_category : req.body.newCategoryName
                }
            },

            {
                new : true
            }
            
        )

        console.log(data);
        res.status(200).json({msg:"Category Added Successfully"})

    }

    catch(err)
    {
        console.log(err.message);
    }

    
    // res.json({msg:"Category obtained Successfully"})
}



export const getCategory = async(req,res)=>{

    try{
        const data = await User.findOne({_id : req.params.id}).exec()
        res.status(200).json(data.docs_category)
    
    }

    catch(err)
    {
        res.status(400).json({msg : "Unable to interact with Database"})
    }




}


export const updateCategory = async(req,res)=>{
    const {updatedCategory, previousCategory} = await req.body
    
    try{
        const edited_category = await User.findOneAndUpdate({
            _id : req.params.id,
            'docs_category' : previousCategory

        },
        {
            $set : {'docs_category.$':updatedCategory}
        },
        {
            new : true
        })

        console.log(edited_category);
        res.status(200).json({msg : "Category Updated Successfully"})
        

    }

    catch(err)
    {
        console.log(`Error connecting with the database : ${err.message}` );
    }
}

export const deleteCategory= async(req,res)=>{
    const {deleted_category} = req.query

    try{

        const deletion = await User.findOneAndUpdate(
            {
                _id : req.params.id,
                'docs_category' : deleted_category
            },
            {
                $pull : {
                    'docs_category' : deleted_category
                }
            },
            {
                new : true
            }

        )

        //deleting files also...

        try{
            await File.findOneAndDelete(
                {
                    category : deleted_category
                }


            )

        }

        catch(err)
        {
            console.log(`Couldn't connect with the database : ${err.message}`);
        }

        


    }

    catch(err)
    {
        console.log(`Unable to Delete Category ${err.message}`);
    }
    

}


export const postFile = async(req,res)=>{
    //file is accessible here...with the help of multer...

    const author_id = req.params.id;
    const file = req.file;
    console.log(file.path);
    
    const category = req.body.category
    const accessURL = `http://localhost:3000/${file.path}`
    const randomFileName = file.path.slice(8)
    console.log(randomFileName);

 

    try{
        if(!file) return res.status(400).json({message : 'No file Uploaded'})
            //otherwise create document

        const newUploads = await File.create({
            fileName : file.originalname,
            randomName : randomFileName,
            category : category,
            url : accessURL,
            author : author_id,
            fileType : file.mimetype,
            fileSize : file.size
        })


        if(newUploads) res.status(200).json({msg : "File Uploaded Successfully..."})

    }

    catch(err)
    {
        console.log(`Couldn't connect with the database : ${err.message}`);
    }
    

}


export const getAllFiles = async(req,res)=>{
    const id = req.params.id;
    console.log(id);
    const getFiles = await File.find
        (
            {
                author : id
            }
        )
        .sort(
        {
            uploadedAt : -1
        }
    )

    console.log(getFiles)
    if(!getFiles) return res.status(404).json({msg : "Couldn't find any files..."})
    else
{
    return res.send(getFiles)   
}    


}


export const deleteFile = async(req,res)=>{
    let randomFileData;
    const id = req.params.id;
    const {deletedFile} = req.query;
    console.log(deletedFile);
    console.log(deletedFile.name);

    //finding random name of file to be deleted

    try{
        randomFileData = await File.findOne(
            {
                fileName : deletedFile.name,
                author : id,
                category : deletedFile.category

            }
        )

        console.log(randomFileData);

    }

    catch(err)
    {
        console.log(`Failed to connect with the database ${err.message}`);
    }


    //for deleting files from the local directory
    const directoryPath = path.join(process.cwd(),'uploads')
    const filePath = path.join(directoryPath,randomFileData.randomName)


    fs.access(filePath,fs.constants.F_OK,(err)=>
    {
        if(err) console.log(`File doesn't exists... ${err.message}`);
        else
        {
            console.log('File exists...');
            fs.unlink(filePath,(err)=>
            {
                if(err) console.log(`${err.message}`);
                else console.log('File Deleted Successfully...');
            })
        }
    })





    try{

    const filesDeleted = await File.findOneAndDelete({
        category : deletedFile.category
    })

    if(filesDeleted) res.status(200).json({msg : "File Deleted Successfully!!"})

}

catch(err)
{
    console.log(`Couldn't connect with the database ${err.message}`);
}
}






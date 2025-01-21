import User from "../models/User.js";
import File from "../models/File.js";



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

        


    }

    catch(err)
    {
        console.log(`Unable to Delete Category ${err.message}`);
    }
    

}


export const postFile = async(req,res)=>{
    //file is accessible here...with the help of multer...
    console.log(req.file);

}






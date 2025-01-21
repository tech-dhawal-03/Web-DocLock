import express from "express";
import multer from "multer"
import {postCategory} from "../controllers/docs_controller.js";
import  {getCategory}  from "../controllers/docs_controller.js";
import { updateCategory } from "../controllers/docs_controller.js";
import { deleteCategory } from "../controllers/docs_controller.js";
import { postFile } from "../controllers/docs_controller.js";


//creating a new express router instance
const router = express.Router();
const upload = multer({dest : 'uploads/'})



//defining routes for card documents page

//routes for applying curd operation on documents categories...
router.post("/:id",postCategory)
router.get("/:id",getCategory)
router.patch("/:id",updateCategory)
router.delete("/:id",deleteCategory)

//routes for applying curd operation on files...

router.post("/:id/upload-document",upload.single('file'),postFile)



export default router


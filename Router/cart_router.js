const cart_router = require("express").Router();
const cart_schema = require("../Schema/cart_schema");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const Storage=multer.diskStorage({
    destination:(req,file,cb)=>{

cb(null , "files&img")

    },
    filename:(req,file,cb)=>{
          cb(null,file.originalname + "_"+Date.now() + path.extname(file.originalname))  
    }
})
const fileFilter = (req, file, cb) => {
    const acceptFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (acceptFileTypes.includes(file.mimetype)) {
        cb(null, true)
    }
    else {
        cb(null, false)
    }
}

const upload = multer({
    storage:Storage,
    fileFilter: fileFilter
})

cart_router.post("/new_cart",upload.single("file"),async(req,res) => {
    const items = new cart_schema({
        Service:req.body.Service,
        Category:req.body.Category,
        Subcategory:req.body.Subcategory,
        Discription:req.body.Discription,
        price:req.body.price,
        originalname: req.file.originalname,
        mimetype: req.file.mimetype,
        filename: req.file.filename,
        path: req.file.path,
        size: req.file.size
       })
       await items.save();
       res.status(200).json({message:"Uploaded Successfully",items})
})

cart_router.get("/new_cart_items",async(req,res)=>{
    const new_fetch_items = await cart_schema.find()
    res.json( new_fetch_items)
})

cart_router.get("/new_cart_items/:id",async(req,res)=>{
    const item_by_id = await cart_schema.findById(req.params.id)
    res.json(item_by_id )
})

cart_router.delete("/delete_item/:id",async(req,res)=>{
    const delExFile = await cart_schema.findById(req.params.id)
    await fs.unlink(delExFile.path,((err)=>{
        if(err){
            console.log(err);
        }
        else{
            console.log("removed del file");
        }
    }));
     await cart_schema.findByIdAndDelete(req.params.id)
     return res.json('Deleted')
})

module.exports = cart_router;
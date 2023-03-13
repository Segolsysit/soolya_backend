const service_router = require("express").Router();
const Service_schem = require("../Schema/Service_schema");
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

service_router.post("/new_service",upload.single("file"),async(req,res) => {
    const items = new Service_schem({
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

service_router.get("/new_fetch_service_items",async(req,res)=>{
    const new_fetch_items = await Service_schem.find()
    res.json( new_fetch_items)
})

service_router.get("/new_fetch_service_items/:id",async(req,res)=>{
    const item_by_id = await Service_schem.findById(req.params.id)
    res.json(item_by_id )
})

service_router.patch("/update_service/:id",upload.single('file'),async(req,res)=>{
    const removeExisitingFile = await Service_schem.findById(req.params.id)
    fs.unlink(removeExisitingFile.path,((err)=>{
        if(err){
            console.log(err);
        }
        else{
            console.log("existing file removed ");
        }

    }));
    const  update_items = await Service_schem.findByIdAndUpdate(req.params.id)
    update_items.Service=req.body.Service,
    update_items.Category=req.body.Category,
    update_items.Subcategory=req.body.Subcategory,
    update_items.Discription=req.body.Discription,
    update_items.price=req.body.price,
    update_items.originalname=req.file.originalname;
    update_items.mimetype=req.file.mimetype;
    update_items.filename=req.file.filename;
    update_items.path = req.file.path;
    update_items.size = req.file.size;
    update_items.name=req.body.name;

    await  update_items .save();
    res.status(200).json("File Updated")
})

service_router.delete("/delete_item/:id",async(req,res)=>{
    const delExFile = await Service_schem.findById(req.params.id)
    await fs.unlink(delExFile.path,((err)=>{
        if(err){
            console.log(err);
        }
        else{
            console.log("removed del file");
        }
    }));
     await Service_schem.findByIdAndDelete(req.params.id)
     return res.json('Deleted')
})

module.exports = service_router;
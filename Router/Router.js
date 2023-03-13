const router = require("express").Router();
const schema = require("../Schema/schema");
const multer = require("multer");
const path = require("path");
const fs = require("fs");




const Storage=multer.diskStorage({
    destination:(req,file,cb)=>{

cb(null , "files&img")

    },
    filename:(req,file,cb)=>{
          cb(null,file.fieldname + "_"+Date.now() + path.extname(file.originalname))  
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


router.post("/new_catagory",upload.single("file"),async(req,res) => {
    const items = new schema({
        catagorySetup:req.body.catagorySetup,
        originalname: req.file.originalname,
        mimetype: req.file.mimetype,
        filename: req.file.filename,
        path: req.file.path,
        size: req.file.size
       })
       await items.save();
       res.status(200).json({message:"Uploaded Successfully",items})
})

router.get("/fetch_items",async(req,res)=>{
    const fetch_items = await schema.find()
    res.json(fetch_items)
})

router.get("/fetch_items_id/:id",async(req,res)=>{
    const item_by_id = await schema.findById(req.params.id)
    res.json(item_by_id )
})



router.patch("/update_items/:id",upload.single('file'),async(req,res)=>{
    const removeExisitingFile = await schema.findById(req.params.id)
    fs.unlink(removeExisitingFile.path,((err)=>{
        if(err){
            console.log(err);
        }
        else{
            console.log("existing file removed ");
        }

    }));
    const update_items = await schema.findByIdAndUpdate(req.params.id)
    update_items.catagorySetup=req.body.catagorySetup;

    update_items.originalname=req.file.originalname;
    update_items.mimetype=req.file.mimetype;
    update_items.filename=req.file.filename;
    update_items.path = req.file.path;
    update_items.size = req.file.size;

    await update_items .save();
    res.status(200).json("File Updated")
})

router.delete("/delete_item/:id",async(req,res)=>{
    const delExFile = await schema.findById(req.params.id)
    await fs.unlink(delExFile.path,((err)=>{
        if(err){
            console.log(err);
        }
        else{
            console.log("removed del file");
        }
    }));
     await schema.findByIdAndDelete(req.params.id)
     return res.json('Deleted')
})


module.exports = router;
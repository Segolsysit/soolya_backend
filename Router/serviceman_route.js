const serviceman_route = require("express").Router();
const serviceManScheme = require("../Schema/serviceman_schema");
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

serviceman_route.get("/get_user",async(req,res) => {
   const userData = await serviceManScheme.find();
    res.json(userData)
})

serviceman_route.get("/get_by_id/:id",async(req,res) => {
    const userData = await serviceManScheme.findById(req.params.id);
     res.json(userData)
 })
 

serviceman_route.post("/user",upload.single("file"),async(req,res) => {

    const userData = new serviceManScheme({
    WorkType: req.body.WorkType,
    district:req.body.district,
    // Title:req.body.Title,
    FirstName:req.body.FirstName,
    LastName:req.body.LastName,
    MobilePhoneNumber:req.body.MobilePhoneNumber,
    StreetAddress:req.body.StreetAddress,
    PostalCode:req.body.PostalCode,
    Email:req.body.Email,
    IdentityType:req.body.IdentityType,
    IdentityNumber:req.body.IdentityNumber,
    originalname:req.file.originalname,
    mimetype:req.file.mimetype,
    filename:req.file.filename,
    path:req.file.path,
    size:req.file.size
})
    await userData.save();
    res.status(200).json({message:"Uploaded Successfully",userData})

})

serviceman_route.patch("/update/:id",upload.single("file"),async(req,res) => {
    const removeExisitingFile = await serviceManScheme.findById(req.params.id)
    fs.unlink(removeExisitingFile.path,((err)=>{
        if(err){
            console.log(err);
        }
        else{
            console.log("existing file removed ");
        }

    }));
    const update_user = await serviceManScheme.findByIdAndUpdate(req.params.id);


    update_user.WorkType= req.body.WorkType,
    update_user.district=req.body.district,
    // update_user.Title=req.body.Title,
    update_user.FirstName=req.body.FirstName,
    update_user.LastName=req.body.LastName,
    update_user.MobilePhoneNumber=req.body.MobilePhoneNumber,
    update_user.StreetAddress=req.body.StreetAddress,
    update_user.PostalCode=req.body.PostalCode,
    update_user.Email=req.body.Email,
    update_user.IdentityType=req.body.IdentityType,
    update_user.IdentityNumber=req.body.IdentityNumber,
    update_user.originalname=req.file.originalname,
    update_user.mimetype=req.file.mimetype,
    update_user.filename=req.file.filename,
    update_user.path=req.file.path,
    update_user.size=req.file.size

    await update_user .save();
    res.status(200).json("File Updated")

})

serviceman_route.delete("/delete_item/:id",async(req,res)=>{
    const delExFile = await serviceManScheme.findById(req.params.id)
    await fs.unlink(delExFile.path,((err)=>{
        if(err){
            console.log(err);
        }
        else{
            console.log("removed del file");
        }
    }));
     await serviceManScheme.findByIdAndDelete(req.params.id)
     return res.json('Deleted')
})
module.exports = serviceman_route;
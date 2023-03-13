const RejectedList_router = require("express").Router();
const RejectedListSchema = require("../Schema/rejected_list_schema");

RejectedList_router.post("/new_rejection", async (req, res) => {
    const deatails = new RejectedListSchema({
        WorkType: req.body.WorkType,
        district: req.body.district,
        FirstName: req.body.FirstName,
        LastName: req.body.LastName,
        MobilePhoneNumber: req.body.MobilePhoneNumber,
        StreetAddress: req.body.StreetAddress,
        PostalCode: req.body.PostalCode,
        Email: req.body.Email,
        IdentityType: req.body.IdentityType,
        IdentityNumber: req.body.IdentityNumber,
    })
    await deatails.save();
    res.status(200).json({message:"Uploaded Successfully",deatails})
})

RejectedList_router.get("/rejected_data",async(req,res)=>{
    const booking_data = await RejectedListSchema.find()
    res.json(booking_data)
})

RejectedList_router.get("/rejected_data/:id",async(req,res)=>{
    const item_by_id = await RejectedListSchema.findById(req.params.id)
    res.json(item_by_id )
})

RejectedList_router.delete("/delete_item/:id",async(req,res)=>{
    await RejectedListSchema.findByIdAndDelete(req.params.id)
    return res.json('Deleted')
})

module.exports = RejectedList_router;
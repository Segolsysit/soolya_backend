const bookingdetails_router = require("express").Router();
const bookingdetails_schema = require("../Schema/bookingdetails_schema");

bookingdetails_router.post("/new_booking", async (req, res) => {
    const deatails = new bookingdetails_schema({
        address: req.body.address,
        street: req.body.street,
        city: req.body.city,
        zip: req.body.zip,
        person: req.body.person,
        number: req.body.number,
        Service: req.body.Service,
        Category: req.body.Category,
        price: req.body.price
    })
    await deatails.save();
    res.status(200).json({message:"Uploaded Successfully",deatails})
})

bookingdetails_router.get("/booking_data",async(req,res)=>{
    const booking_data = await bookingdetails_schema.find()
    res.json(booking_data)
})

bookingdetails_router.get("/booking_data/:id",async(req,res)=>{
    const item_by_id = await bookingdetails_schema.findById(req.params.id)
    res.json(item_by_id )
})

bookingdetails_router.delete("/delete_item/:id",async(req,res)=>{
    await bookingdetails_schema
    .findByIdAndDelete(req.params.id)
    return res.json('Deleted')
})

module.exports = bookingdetails_router;
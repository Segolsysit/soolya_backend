const express = require("express");
const  mongoose  = require("mongoose");
const app = express();
require('dotenv').config()

const router = require("./Router/Router")
const cors = require("cors");
const path = require("path");
const dburl = process.env.DB;
const url = process.env.PORT;

const subcategory_router = require("./Router/subcategory_route");
const service_router = require("./Router/service_route");
const serviceman_route = require("./Router/serviceman_route");
const auth_router = require("./Router/authRoutes");
const cookieParser= require("cookie-parser")
const cart_router = require("./Router/cart_router");
const bookingdetails_router = require("./Router/bookingdetails_router");
const RejectedList_router = require("./Router/RejectedList_router");
const Vendor_register_router = require("./Router/Vendor_register_route");

// server.on("request", app)
app.use(express.urlencoded({extended:false}))
app.set("view engine","ejs")
app.use(express.json())
app.use(cookieParser())
app.use(
    cors({
      origin: "http://localhost:3000",
      methods: ["GET", "POST","PUT","DELETE","PATCH"],
      credentials: true
    })
  );
app.use("/api", router)
app.use("/sub_api", subcategory_router)
app.use("/service_api", service_router )
app.use("/serviceman",serviceman_route);
app.use("/auth_router",auth_router);
app.use("/cart_api",cart_router);
app.use("/booking_api",bookingdetails_router);
app.use("/reject_api",RejectedList_router);
app.use("/vendor_register",Vendor_register_router);
app.use(express.static(path.join(__dirname, "js")));
app.use(express.static(path.join(__dirname, "files&img")));


mongoose.set('strictQuery', true);
mongoose.connect(dburl,(err)=>{
    if(err){
        console.log(err);
    }
    else{
        console.log("DB connected successfully");
    }
})



app.listen(url,(err) => {
    if(err){
        console.log(err);
    }
    

    else{
        console.log(`server started on ${url} port`);
    }
})

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

    const Vendor_register_schema = new mongoose.Schema({
        Username:{
            type:String   
        },
        Email:{
            type:String,
            unique: true
        },
        Password:{
            type:String
        }
    })

    Vendor_register_schema.pre("save", async function (next) {
        const salt = await bcrypt.genSalt();
        this.Password = await bcrypt.hash(this.Password, salt);
        // this.confirmPassword = await bcrypt.hash(this.confirmPassword, salt);
      
        next();
      });

      Vendor_register_schema.statics.login = async function (Email, Password) {
        const vendor = await this.findOne({ Email });
        if (vendor) {
          const vendor_auth = await bcrypt.compare(Password, vendor.Password);
          if (vendor_auth) {
            return vendor;
          }
          throw Error("incorrect password");
        }
        throw Error("incorrect email");
      };

module.exports = mongoose.model("Vendor_register_schema" , Vendor_register_schema)
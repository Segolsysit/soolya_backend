const Vendor_register_schema = require("../Schema/Vendor_register_schema");
const Vendor_register_router = require("express").Router();
const jwt = require("jsonwebtoken");
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
    return jwt.sign({ id }, "soolya vendor super secret key", {
        expiresIn: maxAge,
    });
};

const createToken2 = (id) => {
    return jwt.sign({ id }, "soolya vendor super secret key", {
        expiresIn: maxAge,
    });
};

const handleErrors = (err) => {
    let errors = { Username: "", Email: "", Password: "" };

    console.log(err);

    // if (err.email === " Email is Required"){
    //   errors.email = "Email is Required";
    // }

    if (err.message === "incorrect email") {
        errors.Email = "That email is not registered";
    }

    if (err.message === "incorrect password") {
        errors.Password = "That password is incorrect";
    }

    if (err.code === 11000) {
        errors.Email = "Email is already registered";
        return errors;
    }

    if (err.message.includes("Users validation failed")) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message;
        });
    }

    return errors;
};

Vendor_register_router.post("/", (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(
            token,
            "soolya vendor super secret key",
            async (err, decodedToken) => {
                if (err) {
                    res.json({ status: false });
                    next();
                } else {
                    const Vendor_register_schema1 = await Vendor_register_schema.findById(decodedToken.id);
                    if (Vendor_register_schema1) res.json({ status: true, Vendor: Vendor_register_schema1.Email });
                    else res.json({ status: false });
                    next();
                }
            }
        );
    } else {
        res.json({ status: false });
      next();
    }
})

Vendor_register_router.post("/register", async (req, res, next) => {

    try {
    const {Username , Email, Password } = req.body;

      const Vendor_register_Schema = await Vendor_register_schema.create({Username, Email, Password });
      const token = createToken(Vendor_register_Schema._id);
  
      res.cookie("vjwt", token, {
        withCredentials: true,
        httpOnly: false,
        maxAge: maxAge * 1000,
      });
  
      res.status(201).json({ Vendor: Vendor_register_Schema, created: true });
    } catch (err) {
      console.log(err);
      const errors = handleErrors(err);
      res.json({ errors, created: false });
    }
  });


  Vendor_register_router.post("/login",  async (req, res) => {
    const { Email, Password } = req.body;
    try {
      const Vendor_register_Schema = await Vendor_register_schema.login(Email, Password);
      const token = createToken2(Vendor_register_Schema._id);
      res.cookie("vjwt2", token, { httpOnly: false, maxAge: maxAge * 1000 });
      res.status(200).json({ Vendor_register_schema: Vendor_register_schema._id, status: true });
    } catch (err) {
      const errors = handleErrors(err);
      res.json({ errors, status: false });
    }
  });
    
module.exports = Vendor_register_router;
const jwt = require("jsonwebtoken");
const User = require("../Schema/authModel");
const bcrypt = require("bcrypt");
const nodemailer = require('nodemailer');
const auth_router = require("express").Router();
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, "soolya super secret key", );
};

const createToken2 = (id) => {
  return jwt.sign({ id }, "soolya super secret key", {
    expiresIn: maxAge,
  });
};
const handleErrors = (err) => {
  let errors = {firstName:"", lastName:"", email: "", password: "" };

  console.log(err);

  // if (err.email === " Email is Required"){
  //   errors.email = "Email is Required";
  // }
  
  if (err.message === "incorrect email") {
    errors.email = "That email is not registered";
  }
  
  if (err.message === "incorrect password") {
    errors.password = "That password is incorrect";
  }

  if (err.code === 11000) {
    errors.email = "Email is already registered";
    return errors;
  }

  if (err.message.includes("Users validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};

auth_router.post("/", (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
      jwt.verify(
        token,
        "soolya sheth super secret key",
        async (err, decodedToken) => {
          if (err) {
            res.json({ status: false });
            next();
          } else {
            const user = await User.findById(decodedToken.id);
            if (user) res.json({ status: true, user: user.email });
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

  auth_router.post("/register", async (req, res, next) => {

    try {
    const {firstName , lastName,phoneNumber, email, password } = req.body;

      const user = await User.create({firstName, lastName ,phoneNumber,email, password });
      const token = createToken(user._id);
  
      res.cookie("jwt", token, {
        withCredentials: true,
        httpOnly: false,
      });
  
      res.status(201).json({ user: user, created: true });
    } catch (err) {
      console.log(err);
      const errors = handleErrors(err);
      res.json({ errors, created: false });
    }
  });


  auth_router.post("/login",  async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await User.login(email, password);
      const token = createToken2(user._id);
      res.cookie("jwt2", token, { httpOnly: false, maxAge: maxAge * 1000 });
      res.status(200).json({ user: user._id, status: true });
    } catch (err) {
      const errors = handleErrors(err);
      res.json({ errors, status: false });
    }
  });

  auth_router.post("/forgot_password", async (req, res , next) => {
    const { email } = req.body;
    try {
      const oldUser = await User.findOne({ email });
      if (!oldUser) {
        console.log("user not exist");
        return res.json({ status: "User Not Exists!!" });
      }
      const secret = "soolya sheth super secret key" + oldUser.password;
      const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, {
        expiresIn: "5m",
      });
      const link = `http://localhost:3001/auth_router/reset-password/${oldUser._id}/${token}`;
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        host:  "smtp.ethereal.email",
        port: 587,
        secure: true,
        auth: {
          user: 'senthil.segolsys@gmail.com',
          pass: 'hbdmsjcdmqfdpzwn'
        }
      });

      const mailOptions = {
        from: 'senthil.segolsys@gmail.com', // your Gmail email address
        to: oldUser.email,
        subject: 'Reset-Password',
        text: link
      };

      try{
        await transporter.sendMail(mailOptions);
        res.json({status:'Email sent successfully'});
      }catch(err){
        console.log(err);
        res.status(500).send('Error sending email');
      }

      console.log(link);
      }catch(err){
        console.log(err);
      }
  

    }
      );
    
      auth_router.get("/reset-password/:id/:token",async(req, res , next) => {
        const { id, token } = req.params;
        console.log(req.params);
        // res.send("Done")
        const oldUser = await User.findOne({ _id: id });
        if (!oldUser) {
          return res.json({ status: "User Not Exists!!" });
        }
        const secret = "soolya sheth super secret key" + oldUser.password;
        try {
          const verify = jwt.verify(token, secret);
          res.render( "index" ,{email:verify.email,status:"Not Verified"} );
        } catch (error) {
          console.log(error);
          res.send("Not Verified");
        }

        next()
      });

      auth_router.post("/reset-password/:id/:token",async(req, res) => {
        const { id, token } = req.params;

        const {password} = req.body;
        // console.log(req.params);
        // res.send("Done")
        const oldUser = await User.findOne({ _id: id });
        if (!oldUser) {
          return res.json({ status: "User Not Exists!!" });
        }
        const secret = "soolya sheth super secret key" + oldUser.password;
        try {
          const verify = jwt.verify(token, secret);
          const salt = await bcrypt.genSalt();
          const  encryptedpassword = await bcrypt.hash(password, salt);

          await User.updateOne(
          {
            _id:id
          },
          { 
           $set:{
            password:encryptedpassword
          }
          }
          )

            // res.json({status:"password updated"})
            res.render( "index" ,{email:verify.email,status:"verified"} );


        } catch (error) {
          console.log(error);
          return res.json({status:"Something went wrong"});
        }
      });

module.exports = auth_router;

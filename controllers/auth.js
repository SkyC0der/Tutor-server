const bcrypt = require('bcryptjs');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

exports.signUp = (req, res, next) =>{
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const email = req.body.email;
  const password = req.body.password;
  const role = req.body.role;

  if(!firstname || !lastname || !email || !password){
    res.status(400)
    res.send({ status: false, message: "All fields are required"})
    return;
  } else if(role == 'admin'){
    res.status(400).send({ status: false, message: "You can not sign up as an admin"})
    return;
  }

  User.findOne({ email })
  .then(user => {
    if (user) {
      return res
        .status(423)
        .send({status: false, message: "This email already exists"});
    }else{
      bcrypt
  .hash(password, 12)
  .then(password => {
    let user = new User({
      firstname,
      lastname,
      email,
      password,
      role
    });
     user.save();
     return user;
  })
  .then((user) => res.status(200).send({ status: true, message: "User registered successfully", user: user }))
    }
  })
  .catch(err => console.log(err));
}


exports.logIn = (req, res, next) =>{
  const { email, password } = req.body;
  User.findOne({ email })
  .then(user =>{
    if(!user){
      return res
      .status(404)
      .send({ status: false,message: "Email address not found, input correct email address "})
    }
    bcrypt.compare(password, user.password)
    .then(valid =>{
      if(!valid){
        return res
        .status(404)
        .send({ status: false, message: "Password incorrect, please try again "})
      }
      const accessToken = jwt.sign(
        {email: user.email, _id: user._id }, "startdotng", { expiresIn: "1hr" }
      );
      User.findByIdAndUpdate(user._id, {accessToken})
      res.status(200).send({
        status: true,
        message: "Login successful",
        _id: user._id,
        accessToken
      })
    })
  })
  .catch(err => console.log )
}
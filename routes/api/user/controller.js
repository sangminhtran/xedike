const { User } = require("../../../models/User");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const {validatePostInput} = require('../../../validation/user/validatePostInput');

module.exports.getUsers = (req, res, next) => {
  User.find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => res.json(err));
};

module.exports.createUser = async (req, res, next) => {
  //next: chạy xong middleware đầu tiên sẽ cho phép chạy middleware tiếp thep
  //validation
  //hash password
  //data=req.body


  const { email, password, DOB, userType, phone, avatar} = req.body;
  const {isValid, errors} = await validatePostInput(req.body);
  
  if(!isValid) return res.status(400).json(errors)

  const newUser = new User({
    email,
    password,
    DOB,
    userType,
    phone,
    avatar
  });

  bcrypt.genSalt(10, function(err, salt) {
    if (err) return res.json(err);

    bcrypt.hash(password, salt, (err, hash) => {
      // Store hash in your password DB.
      if (err) return res.json(err);
      newUser.password = hash;
      newUser
        .save()
        .then(user => {
          res.status(200).json(user);
        })
        .catch(err => res.json(err));
    });
  });
};

module.exports.getUserById = (req, res, next) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(400).json({ message: "Id invalid" });

  User.findById(id)
    .then(user => {
      if (!user)
        return Promise.reject({ status: 404, message: "User not found" });

      res.status(200).json(user);
    })
    .catch(err => {
      res.status(err.status).json({ message: err.message });
    });
};

module.exports.updateUserById = (req, res, next) => {
  const { id } = req.params;

  User.findById(id)
    .then(user => {
      if (!user)
        return Promise.reject({ status: 404, message: "User not found" });

      // const { email, password, DOB, userType, phone } = req.body;
      // user.email = email;
      // user.password = password;
      // user.DOB = DOB;
      // user.userType = userType;
      // user.phone = phone;

      //user[key] = req.body[key]
      Object.keys(req.body) //["email", "password",...]
        .forEach(field => {
          user[field] = req.body[field];
          console.log(field);
        });

      bcrypt.genSalt(10, function(err, salt) {
        if (err) return res.json(err);

        bcrypt.hash(user.password, salt, (err, hash) => {
          // Store hash in your password DB.
          if (err) return res.json(err);
          user.password = hash;

          user
            .save()
            .then(user => {
              res.status(200).json(user);
            })
            .catch(err => res.json(err));
        });
      });
    })
    .catch(err => {
      if (!err.status) return res.json(err.json);

      res.status(200).json(err.message);
    });
};

module.exports.deleteUserById = (req, res, next) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(400).json({ message: "Id invalid" });

  User.deleteOne({ _id: id })
    .then(result => {
      res.status(200).json(result);
    })
    .catch(err => res.json(err));
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email })
    .then(user => {
      if (!user)
        return Promise.reject({ status: 404, message: "User not found" });

      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (!isMatch)
          return res.status(400).json({ message: "Wrong password" });

        const payload = {
          id: user._id,
          email: user.email,
          userType: user.userType
        };
        jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: 60 }, (err, token) => {
          if (err) res.json(err);

          res.status(200).json({
            success: true,
            token
          });
        });
      });
    })
    .catch(err => {
      if (!err.status) return res.json(err);
      res.status(err.status).json(err.message);
    });
};

module.exports.uploadAvatar = (req, res, next) => {
  const { id } = req.params;
  User.findById(id)
    .then(user => {
      if (!user)
        return Promise.reject({ status: 404, message: "User not found" });

      user.avatar = req.file.path;
      return user.save();
    })
    .then(user => {
      res.status(200).json(user);
    })
    .catch(err => {
      if (!err.status) return res.json(err);
      res.status(200).json({ message: err.message });
    });
};

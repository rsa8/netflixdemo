const bcrypt = require("bcrypt"); // npm i bcryptjs
const Users = require("../model/users");
const SystemInfo = require("../model/systemInfo");
const jwt = require('jsonwebtoken');

const { lookup } = require('geoip-lite');

exports.login = (req, res, next) => {
  console.log(req.body);
    let fetchedUser;
    Users.findOne({ email: req.body.email })
    .then(result => {
        if (!result) {
          return res.status(401).json({
              message: 'Invalid Email'
          });
        }
        fetchedUser = result;
        return bcrypt.compare(req.body.password, result.password);
    })
    .then(result =>{

        if (!result) {
            return res.status(401).json({
                message: 'Invalid Password'
            })
        }
        const token = jwt.sign(
            { email: fetchedUser.email, id: fetchedUser._id },
            'secret_key_this_should_be_longer',
            { expiresIn: '1h' }
        );
        res.status(201).json({
            token: token,
            user: fetchedUser,
            expiresIn: 3600
        });
    })
    .catch(err => {
        console.log("Error block" + err);
        res.status(401).json({
            message: err.message
        })
    })
}

exports.signup = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then(hash => {
        const user = new Users({
            email: req.body.email,
            password: hash
        });
        user.save()
        .then(createdUser => {
            console.log(createdUser);
            res.status(201).json({
                message: "user added successfully",
                user: createdUser
            });
        })
        .catch(err => {
            res.status(401).json({
                message: "user not added",
                user: ""
            });
        })
    });
}

exports.getSystemInfo = (req, res, next) => {
  console.log("heheheh");
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  const info = req.headers['user-agent']
  console.log(ip); // ip address of the user
  console.log(lookup(ip)); // location of the user
  const a = {
    info: {
      ip: ip,
      geo: lookup(ip),
      systemInfo: info
    }
  }

  const system = new SystemInfo({
    info: a
  });
  system.save()
  .then(result => {
    res.status(200).json({
      message: ip,
      geo: lookup(ip),
      info: info
    })
  })
  .catch(error => {
    res.status(404).json({
      message: error
    })
  })
}

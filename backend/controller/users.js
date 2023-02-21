const bcrypt = require("bcrypt"); // npm i bcryptjs
const Users = require("../model/users");
const SystemInfo = require("../model/systemInfo");
const jwt = require('jsonwebtoken');

const { lookup } = require('geoip-lite');

exports.login = (req, res, next) => {

    Users.findOne({
      email: req.body.email,
    })
      .exec((err, user) => {
        console.log(err);
        if (err) {
          res.status(200).send({ message: err, token:'', expiresIn: 0 , status: 0, user: ''  });
          return;
        }
        if (!user) {
          return res.status(200).send({ message: "User Not found.", token:'', expiresIn: 0 , status: 0, user: '' });
        }
        var passwordIsValid = bcrypt.compareSync(
          req.body.password,
          user.password
        );
        if (!passwordIsValid) {
          console.log('sdfsdf');
          return res.status(200).send({ message: "Invalid Password!", token:'', expiresIn: 0, status: 0, user: ''  });
        }
        const token = jwt.sign(
          { email: user.email, id: user._id },
          'secret_key_this_should_be_longer',
          { expiresIn: '1h' });

       // req.session.token = token;
        res.status(200).send({
          token: token,
          status: 1,
          message: 'Logged in',
          expiresIn: 3600,
          user: user.email,
        });
      });
  }

exports.signup = (req, res, next) => {
    // Email
    Users.findOne({
      email: req.body.email
    }).exec((err, user) => {
      if (err) {
        res.status(500).send({
          message: err,
          user: " ",
          status: 0
        });
        return;
      }

      if (user) {
        console.log("sdfsdf" + user)
        res.status(200).send({
          message: "Failed! Email is already in use!",
          user: " ",
          status: 0
        });
        return;
      } else {
        bcrypt.hash(req.body.password, 10)
          .then(hash => {
              const user = new Users({
                  email: req.body.email,
                  password: hash
              });
              user.save((err, user) => {
                if (err) {
                  console.log(err);
                  res.status(201).json({
                    message: "Account Created please login",
                    user: '',
                    status: 1
                  });
                  return;
                }
                if (user) {
                  console.log("asfewd dcsdf" + user);
                  res.status(201).json({
                    message: "Account Created please login",
                    user: user,
                    status: 1
                });
                }
              })
          });
        }
    });
}


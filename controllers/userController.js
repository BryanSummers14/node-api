'use strict';

var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');
var User = require('../models/UserModel');

var config = require('../configs');

exports.register = function(req, res) {
    var newUser = new User(req.body);
    newUser.hash_password = bcrypt.hashSync(req.body.password, 10);
    newUser.save(function(err, user) {
    if (err) {
      return res.status(400).send({
        message: err
      });
    } else {
      user.hash_password = undefined;
      return res.status(201).json({token: jwt.sign({ email: user.email, fullName: user.fullName, _id: user._id}, config.secret)});
    }
  });
};

exports.sign_in = function(req, res) {
    User.findOne({
        email: req.body.email
      }, function(err, user) {
        if (err) res.status(500).send(err);
        if (!user) {
          res.status(401).json({ message: 'Authentication failed. User not found.' });
        } else if (user) {
          if (!user.comparePassword(req.body.password)) {
            res.status(401).json({ message: 'Authentication failed. Wrong password.' });
          } else {
            return res.status(200).json({token: jwt.sign({ email: user.email, fullName: user.fullName, _id: user._id}, config.secret)});
          }
        }
      });
};

exports.loginRequired = function(req, res, next) {
    if (req.user) {
        next();
      } else {
        return res.status(401).json({ message: 'Unauthorized user!' });
      }
};

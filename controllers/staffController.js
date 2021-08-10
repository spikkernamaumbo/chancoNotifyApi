"use strict";

const { response } = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const staff_model = require("../models/staff");
// const e = require("express");

exports.get_all_staffs = async (req, res) => {
  const staffs = staff_model.findAll({
    attributes: [
      "id",
      "firstName",
      "lastName",
      "email",
      "password",
      "createdAt",
    ],
  });

  staffs.then((response) => {
    if (response.length === 0 || response === null) {
      res.status(401).json({
        message: "there is no staff available",
      });
    } else {
      res.status(200).json({
        message: "list of staffs",
        staff: response,
      });
    }
  });
};

//sign up use case from the admin side
exports.sign_up_a_lecturer = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  const salt = await bcrypt.genSalt(10);

  //hashing the user password
  const hashed_password = await bcrypt.hash(password, salt);

  const staff = staff_model.findOne({
    where: { email },
  });

  staff
    .then((response) => {
      if (response) {
        res
          .status(409)
          .json({ message: `user already exists with Email ${email}` });
      } else {
        try {
          // changing the password into hashed password
          const new_staff = Object.assign(req.body, {
            password: hashed_password,
          });

          // saving into the staff model
          staff_model.create(new_staff).then(() => {
            res.status(201).json({ message: `successfully registered` });
          });
        } catch (err) {
          if (res.status === 404) res.status(404).json({ message: err });
        }
      }
    })
    .catch((err) => {
      res.status(500).json({ message: `Opps ${err.message}` });
      console.log(err);
    });
};

// login use case
exports.LoginAStaff = async (req, res, next) => {
  const { email, password } = req.body;

  // checking if email exists
  const staff_existential = await staff_model.findOne({ where: { email } });

  if (staff_existential) {
    const checkpassword = await bcrypt.compare(
      password,
      staff_existential.password
    );
    if (!checkpassword) {
      res
        .status(422)
        .json({ 
          status:"login error", 
          message: "wrong password please re-enter your password"
         });
      return false;
    } else {
      res.status(200).json({
        Status: "login successfully",
        detail:staff_existential,
        
      });
      return true;
    }
  } else if (!staff_existential) {
    res.status(422).json({
      status:"no user",
       message: "wrong email please re-enter your email" 
      });
  } else {
    res
      .status(500)
      .json({ message: "opps errors were meant for humans encounter" });
  }
};

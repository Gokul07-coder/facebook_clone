const db = require("../Util/database");
const express = require("express");
const { Router } = require("express");
const route = Router();
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const { resume } = require("../Util/database");
route.use(express.json());
const jwt = require("jsonwebtoken");

var loginRoute = (req, res) => {
  console.log("Login page");
  res.json({ message: "Loginpage ...." });
};

var loginPost = (req, res) => {
  const Email = req.body.email;
  console.log(Email);

  try {
    //requires email and password ...........
    // console.log("hello");
    const Email = req.body.email;
    // console.log("OTP send to ", mail(Email));
    console.log(Email);
    db.query(
      "SELECT email from account where email = ? ",
      [Email],
      (err, result) => {
        if (err) {
          console.log(err);
        } else if (result.length > 0) {
          console.log("User found");

          db.query(
            "Select password as checkPassword from account where email = ?",
            [Email],
            (err, result) => {
              if (err) {
                console.log(err);
              } else if (result.length > 0) {
                console.log("res ", result.length);

                async function checking() {
                  const hashpass = await bcrypt.hash(req.body.password, 5);
                  // console.log(req.body.password);
                  if (
                    await bcrypt.compare(
                      req.body.password,
                      result[0].checkPassword
                    )
                  ) {
                    db.query(
                      "select * from account where email = ?",
                      [Email],
                      (err, result) => {
                        if (err) {
                          console.log("error", err);
                        } else {
                          const token = jwt.sign(
                            { user_id: result[0].id, Email },
                            "secret",
                            {
                              expiresIn: "1d",
                            }
                          );
                          console.log("token generated : ", token);
                          db.query(
                            "update account set token = ? where email = ?",
                            [token, Email],
                            (err, result) => {
                              if (err) {
                                console.log(err);
                              } else {
                                console.log("Token stored");
                                // res.status(201).json({message : "Token created and stored .."})
                              }
                            }
                          );
                        }
                      }
                    );
                    console.log("success you are an signed up user");
                    res.json({ message: "OK" });
                  } else {
                    console.log("Password Wrong");
                    res.json({ message: "Password wrong" });
                  }
                }
                checking();
              } else {
                console.log("Password wrong ...");
                res.json({ message: "Password wrong" });
              }
            }
          );
        } else {
          console.log("User doesn't exist just signup yourself");
          res.json("Signup ...");
        }
      }
    );
    // res.json("OK ")
  } catch {
    res.json("Error encountered");
  }
};

module.exports = { loginPost, loginRoute };

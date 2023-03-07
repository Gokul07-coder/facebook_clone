const nodemailer = require("nodemailer");
const mail = require("../Util/nodemailer");
const OTP = require("otp-generator");
const env = require("dotenv").config({ path: "../Util/.env" });
const db = require('../Util/database');

async function sendMail(firstname, email) {
    otp = OTP.generate(6, {
      lowerCaseAlphabets: false,
      upperCaseAlphabets: false,
      specialChars: false,
    });
    console.log("OTP : ", otp);

    db.query(
      "Insert into OTP (otp,email) values (?,?)",
      [otp, email],
      (err, resu) => {
        if (err) {
          console.log("Error occured");
        } else {
        //   res.status(201).json({ message: "OTP GENERATED" });
          console.log("OTP stored successfully");
        }
      }
    );

    const transport = nodemailer.createTransport({
      service: process.env.SERVICE_PROVIDER,
      auth: {
        user: "no.reply.facebookclone@gmail.com" || process.env.USER,
        pass: "xksu eciy pfwh shkp" || process.env.PASSWORD,
      },
    });

    const option = {
      from: process.env.USER,
      to: email,
      subject: "facebook - OTP",
      text: `Welcome ${firstname}, 
        
                  Here is your OTP for creating an account - ${otp}
                  Have Fun, you SOCIAL WANDERER
        
                  Thank You `,
    };

    transport.sendMail(option, (err, info) => {
      if (err) {
        console.log("Error : ", err);
      } else {
        console.log(`sent OTP to ${email}`);
      }
    });
  }

  module.exports = {sendMail};
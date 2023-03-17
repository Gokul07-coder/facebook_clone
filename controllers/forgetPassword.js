const express = require('express');
const db = require('../Util/database');
const route = express.Router();
route.use(express.json());
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const OTP = require('otp-generator');
const Mail = require('nodemailer/lib/mailer');
require('dotenv').config({path : '../Util/.env'});


let forgetPassword = (req,res)=>{
    console.log("No worry u can change your password here ...")
    res.json({message : "Change password here.."})
}

let postMethod =  (req,res)=>{
    // console.log("hi");
    try{
        console.log("hi");
        const email = req.body.email;
        console.log(email);

        db.query('select otp from OTP where email = ?', [email], (err,result)=>{
            if(err){
                console.log(err);
                res.status(401).json({message: "Error Encountered"});
            }
            else if(result.length>0){
                console.log("OTP already sent");
                res.status(201).json({message : `OTP already sent to ${email}`})
            }
            else{
                sendOtp(email);
            }
        })


        let sendOtp = function(email){
            
            db.query('SELECT email,first_name from account where email = ?', [email], (err,result)=>{
            if(err){
                console.log("Error Happened");
            }
            else if(result.length>0){
                console.log("Email present and otp can be send");
                res.json("ok")
                mail(email,result[0].first_name);
            }
            else{
                console.log("NO such email exist")
                res.json({message : "Email dont exist for the account..."})
            }
        })
    }

        async function mail(email,name){

            otp = OTP.generate(6 , {lowerCaseAlphabets: false,upperCaseAlphabets: false, specialChars: false });
            console.log("OTP : ", otp);

            db.query('Insert into OTP (otp,email) values (?,?)', [otp,email], (err,res)=>{
                if(err){
                    console.log("Error occured");
                }
                else{
                    console.log("OTP stored successfully");
                }
            })
            // console.log("hf",process.env.USER1,process.env.SERVICE_PROVIDER);

            const transport = nodemailer.createTransport({
                service : process.env.SERVICE_PROVIDER,
               
                auth: {
                  user :  process.env.EMAIL_USER,
                  pass : process.env.EMAIL_PASSWORD
                }  
              });
              
              const option = {
                  from : process.env.EMAIL_USER,
                  to : email,
                  subject : "Password Change - OTP",
                  text : `Hello ${name},

                  Your OTP for changing Password is - ${otp}
                  
                  Thank you :)`
              
              }
              
              transport.sendMail(option, (err,info)=>{
                  if(err){
                      console.log("Error : ", err)
                  }
                  else{
                      console.log("sent OTP ", info);
                  }
              })
        }

    }
    catch{
        console.log("Error at catch ...");
        res.json("Error at Catch block");
    }

}


let changePassword = (req,res)=>{
        const mail = req.body.email;
        const otp_user = req.body.otp;

        db.query('select otp from OTP where email = ?', [mail],(err,result)=>
        {
            if(err) console.log("Error at fetching otp");
            
            else if(result[0].otp === otp_user){
                pass();
            }
            else{
                console.log(result[0].otp);
                res.json({message : " Entered OTP is incorrect ..."})
                console.log("OTP wrong")
            }
        })

        async function pass(){
            hashPassword = await bcrypt.hash(req.body.password, 5);
            db.query('update account set password = ? where email = ? ', [hashPassword,mail], (err,result1)=>{
                if(err) {
                    console.log("error inserting");
                    res.json({message: "Error at pass function"})
                }
                else{
                    console.log("Password updated");
                    res.json({message : "Changed"});
                    db.query('delete from OTP where email = ?', [mail], (err,resul)=>{
                        if(err){
                            console.log("Error at deleting ");
                        }
                        else{
                            console.log("Successfull");
                        }
                })
                }
            })
        }

}

module.exports = { forgetPassword, postMethod, changePassword };
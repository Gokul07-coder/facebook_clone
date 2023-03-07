const db = require("../Util/database");
const jwt = require("jsonwebtoken");

async function verify(email) {
  // user_otp = req.body.otp;
  console.log("OTP verified");
  // res.status()..json({message : "OTP verified"})

  db.query(
    "update account set isVerified = true where email = ?",
    [email],
    (err, result) => {
      if (err) {
        console.log("Error at verifying");
        // res.status(401).json({message : "Error at setting status"})
      } else {
        console.log("User verified");
        db.query(
          "select * from account where email = ?",
          [email],
          (err, result) => {
            if (err) {
              console.log("error", err);
            } else {
              const token = jwt.sign(
                { user_id: result[0].id, email },
                "secret",
                {
                  expiresIn: "1d",
                }
              );
              console.log("token generated : ", token);
              db.query(
                "update account set token = ? where email = ?",
                [token, email],
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
        db.query("delete from OTP where email = ?", [email], (err, resu) => {
          if (err) {
            console.log(err);
          } else {
            console.log("Deleted successfully");
            //   res.json({message : "Deletion of otp  is success"});
          }
        });
      }
    }
  );
}

module.exports = { verify };

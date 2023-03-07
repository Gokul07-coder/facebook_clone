const express = require("express");
const db = require("../../Util/database");

let getList = (req, res) => {
  let { user_id } = req.user;
  try {
    db.query(
      "select distinct id,first_name,profile from account where id not in (select friends_id from friend where id = ?) and id not in (?)",
      [user_id, user_id],
      (err, result) => {
        if (err) {
          console.log("Error at Fetching", err);
          res.status(401).json({ message: "Error at Fetching details" });
        } else {
          console.log("Displayed");
          res.status(201).json(result);
        }
      }
    );
  } catch {
    console.log("Error at Catch");
    res.status(401).json({ Message: "Error at catch" });
  }
};

let addFriend = (req, res) => {
  try {
    let { user_id } = req.user;
    const req_id = req.body.id;
    db.query(
      "Insert into friend_req (id,request_id,isAccepted) values (?,?,?)",
      [req_id, user_id, 0],
      (err, result) => {
        if (err) {
          console.log("Error at sending Friend Request");
          res.status(401).json({ message: "Error at sending Friend request" });
        } else {
          console.log("Request sent");
          res.status(201).json({ message: "Request Sent" });
        }
      }
    );
  } catch {
    console.log("Error at catch");
    res.status(401).json({ message: "Error at catch" });
  }
};

let remove_suggestion = (req, res) => {
  try {
    let { user_id } = req.user;
    let suggestion_id = req.body.id;
    db.query(
      "select distinct id,first_name,profile from account where id not in (?,?)",
      [user_id, suggestion_id],
      (err, result) => {
        if (err) {
          console.log("Error at removing suggestion");
          res.status(401).json({ message: "Error at removing suggestion" });
        } else {
          console.log("Removed");
          res.status(201).json({ result });
        }
      }
    );
  } catch {
    console.log("Error at  catch");
    res.status(401).json({ message: "Something went wrong" });
  }
};
module.exports = { getList, addFriend, remove_suggestion };

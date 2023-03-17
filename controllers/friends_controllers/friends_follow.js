const db = require("../../Util/database");

let getFriends = (req, res) => {
  try {
    let { user_id } = req.user;
    db.query(
      "select first_name,profile,account.id from account where id in (select friends_id from friend where id = ? )",
      [user_id],
      (err, result) => {
        if (err) {
          console.log("Error at fetching", err);
          res.status(401).json({ message: "Error at fetching" });
        } else if (result.length === 0) {
          console.log("Hooooh you dont have any friends add your friends ");
          res.status(201).json({ message: "No friends" });
        } else {
          console.log("Information retreived");
          res.status(201).json({ result });
        }
      }
    );
  } catch {
    console.log("Error at catch");
    res.status(401).json({ message: "Error at catch" });
  }
};

let getFollowing = (req, res) => {
  try {
    let { user_id } = req.user;
    db.query(
      "select account.id,first_name,profile from account where id in (select following_id from follow where follower_id = ?)",
      [user_id],
      (err, result) => {
        if (err) {
          console.log("Error at fetching ");
          console.log(err);
          res.status(401).json({ message: "Error at catch" });
        } else {
          console.log("Data retreived");
          res.status(201).json({ result });
        }
      }
    );
  } catch (err) {
    console.log("Error at catch");
    console.log(err);
    res.status(401).json({ message: "Error at catch" });
  }
};



module.exports = { getFriends, getFollowing };

let db = require("../../Util/database");

let sendInvite = (req, res) => {
  const { user_id } = req.user;
  const group_id = req.body.group_id;
  const f_id = req.body.f_id;
  try {
    db.query(
      "select friends_id from friend where id = ?",
      [user_id],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          let arr = [];
          let results = Object.values(JSON.parse(JSON.stringify(result)));
          results.forEach((key) => {
            arr.push(key.friends_id);
          });

          let adding = new Promise(function (present, notpresent) {
            if (arr.includes(parseInt(f_id))) {
              present("Friend present and can be added");
            } else {
              notpresent(
                "You are not yet friends so you can't add him into close friends circle"
              );
            }
          })
            .then(() => {
              console.log(group_id);
              db.query(
                "insert into group_req (id,request_id,group_id) values (?,?,?)",
                [f_id, user_id, group_id],
                (err, result) => {
                  if (err) {
                    console.log(err);
                    res.status(401).send("Error at sending request");
                  } else {
                    console.log("request send to user : ", f_id);
                    res
                      .status(201)
                      .send({ message: "Request send successfully" });
                  }
                }
              );
            })
            .catch((err) => {
              res.status(401).send({
                message: "You can't invite someone who is not an friend",
              });
            });
        }
      }
    );
  } catch (err) {
    console.log(err);
    res.status(401).send({ message: "Something went wrong" });
  }
};

const request = (req, res) => {
  console.log("Page for showing request.....");
  try {
    let { user_id } = req.user;
    // let {group_id,id} = req.body;
    db.query(
      "select request_id,group_id from group_req where id = ?",
      [user_id],
      (err, result) => {
        if (err) {
          console.log(err);
          res.status(401).send({ message: "Error at retrieving" });
        } else if (result.length > 0) {
          res.status(201).send({ message: result });
        } else {
          res.status(201).send({ message: "You have no such request" });
        }
      }
    );
  } catch (e) {
    console.log(e);
    res.status(401).send({ message: "Something went wrong" });
  }
};

const acceptGroupRequest = (req, res) => {
  console.log("Here you can accept he group");

  try {
    let group_id = req.body.group_id;
    let { user_id } = req.user;
    db.query(
      "insert into group_members (group_id,members_id) values (?,?)",
      [group_id, user_id],
      (err, result) => {
        if (err) {
          console.log(err);
          // res.status(401).send({message : "Error at adding"});
        } else {
          console.log("ok");
          db.query(
            "delete from group_req where id = ?  and group_id = ? ",
            [user_id, group_id],
            (err, result) => {
              if (err) {
                console.log(err);
                res.status(401).send({ message: "Error at adding" });
              } else {
                console.log("ok");
                res.status(201).send({ message: "Added into group" });
              }
            }
          );
        }
      }
    );
  } catch (e) {
    console.log(e);
    res.status(401).send({ message: " Somthing went wrong" });
  }
};

const deleteGroupRequest = (req, res) => {
  try {
    let group_id = req.body.group_id;
    let { user_id } = req.user;
    db.query(
      "delete from group_req where id = ? and group_id = ?",
      [user_id, group_id],
      (err, result) => {
        if (err) {
          console.log(err);
          res.status(401).send({ message: "Error at removing request" });
        } else {
          console.log("ok");
          res
            .status(201)
            .send({ message: "Request from the group deleted successfully" });
        }
      }
    );
  } catch (e) {
    console.log(e);
    res.status(401).send({ message: "Something went wrong " });
  }
};

const leaveGroup = (req, res) => {
  try {
    const group_id = req.body.group_id;
    const { user_id } = req.user;
    db.query(
      "delete from group_members where group_id = ? and members_id = ?",
      [group_id, user_id],
      (err, result) => {
        if (err) {
          console.log(err);
          res.status(401).send({ message: "Error in leaving from group" });
        } else {
          console.log("ok");
          res.status(201).send({ message: "You left the group" });
        }
      }
    );
  } catch (e) {
    console.log(e);
    res.status(401).send({ message: "Something went wrong" });
  }
};
module.exports = {
  sendInvite,
  request,
  acceptGroupRequest,
  leaveGroup,
  deleteGroupRequest,
};

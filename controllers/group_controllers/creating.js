const db = require("../../Util/database");

let createGroup = (req, res) => {
  let { user_id } = req.user;
  const { name, privacy, visibility } = req.body;
  try {
    if (privacy === "Public") {
      db.query(
        "Insert into fb_group (id,group_name,privacy) values (?,?,?)",
        [user_id, name, privacy],
        (err, result) => {
          if (err) {
            console.log(err);
            res.status(401).send({ message: "Error in creating group" });
          } else {
            console.log("Created");
            db.query(
              "select group_id from fb_group where group_name = ? and id = ?",
              [name, user_id],
              (err, result) => {
                if (err) console.log(err);
                else {
                  console.log(result);
                  let results = Object.values(
                    JSON.parse(JSON.stringify(result))
                  );
                  results.forEach((key) => {
                    console.log(key.group_id);
                  });
                  let group_id = results[0].group_id;
                  db.query(
                    "insert into group_members values (?,?)",
                    [group_id, user_id],
                    (err, result) => {
                      if (err) {
                        console.log(err);
                        res.status.send({
                          message: "Error at creating the group ",
                        });
                      } else {
                        res.status(201).send({ message: "Group created" });
                      }
                    }
                  );
                }
              }
            );
          }
        }
      );
    } else if (privacy === "Private") {
      db.query(
        "Insert into fb_group (id,group_name,privacy,Visibility) values (?,?,?,?)",
        [user_id, name, privacy, visibility],
        (err, result) => {
          if (err) {
            console.log(err);
            res.status(401).send({ message: "Error at creating" });
          } else
            res.status(201).send({ message: "Group created successfully" });
        }
      );
    }
  } catch (err) {
    console.log(err);
    res.status(401).send({ message: "Something went wrong" });
  }
};

let groupsYouManage = (req, res) => {
  let { user_id } = req.user;
  try {
    db.query(
      "select group_name from fb_group where id = ?",
      [user_id],
      (err, result) => {
        if (err) {
          console.log(err);
          res.status(401).send({ message: "Error at fetching" });
        } else {
          console.log("Fetched");
          res.status(201).send({ message: result });
        }
      }
    );
  } catch (err) {
    console.log(err);
    res.status(401).send({ message: "Something went wrong" });
  }
};

let deletingGroup = (req, res) => {
  let { user_id } = req.user;
  let name = req.body.name;
  try {
    db.query(
      "delete from fb_group where id = ? and group_name = ?",
      [user_id, name],
      (err, result) => {
        if (err) {
          console.log(err);
          res.status(401).send({ message: "Error at deleting" });
        } else {
          res.status(201).send({ message: "Deleted the group" });
        }
      }
    );
  } catch (err) {
    console.log(err);
    res.status(401).send({ message: "Something went wrong" });
  }
};

module.exports = { createGroup, groupsYouManage, deletingGroup };

let db = require("../../Util/database");

let getFavourites = (req, res) => {
  let { user_id } = req.user;
  try {
    db.query(
      "select first_name,profile,id from account where id in (select friend_id from favourites where id = ?)",
      [user_id],
      (err, result) => {
        if (err) {
          console.log("Error at fetching", err);
          res.status(401).send({ message: "Error at fetching" });
        } else if (result.length === 0) {
          // console.log();
          res.status(200).send({ message: "You haven't added any friends" });
        } else {
          console.log(result);
          res.status(200).send({ message: "List of close friends", result });
        }
      }
    );
  } catch (err) {
    console.log(err);
    res.status(401).send({ message: "Something went wrong" });
  }
};

let addingFavourite = (req, res) => {
  let { user_id } = req.user;
  let f_id = req.body.id;
  f_id = parseInt(f_id);

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
            if (arr.includes(f_id)) {
              present("Friend present and can be added");
            } else {
              notpresent(
                "You are not yet friends so you can't add him into favourite friends circle"
              );
            }
          });
          adding
            .then((resu) => {
              db.query(
                "Insert into favourites values (?,?)",
                [user_id, f_id],
                (err) => {
                  if (err) {
                    console.log("error at adding");
                  } else {
                    console.log("Added into favourites");
                    res.status(200).send({ message: "Added into favourites" });
                  }
                }
              );
            })
            .catch((err) => {
              // console.log(err);
              res.status(401).send({ message: err });
            });
        }
      }
    );
  } catch (err) {
    console.log(err);
    res.status(401).send({ message: "Something went wrong" });
  }
};

let removeFavourite = (req, res) => {
  let { user_id } = req.user;
  let id = req.body.id;
  try {
    db.query(
      "delete from favourites where id = ? and friend_id = ? ",
      [user_id, id],
      (err, result) => {
        if (err) {
          console.log(err);
          res.status(401).send({ message: "Error at deleting" });
        } else {
          console.log("Deleted");
          res.status(201).send({ message: "Removed from favourite friends" });
        }
      }
    );
  } catch (err) {
    console.log(err);
    res.status(401).send({ message: "Something went wrong" });
  }
};

module.exports = { addingFavourite, getFavourites, removeFavourite };

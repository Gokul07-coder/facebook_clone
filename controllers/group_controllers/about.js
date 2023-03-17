//getting about

const db = require("../../Util/database");

const aboutGroup = (req, res) => {
  const { user_id } = req.user;
  const group_id = req.body.group_id;
  try {
    db.query(
      "select privacy,Visibility,createdAt from fb_group where group_id = ?",
      [group_id],
      (err, result) => {
        if (err) {
          console.log("Error at fetching", err);
        } else {
          console.log("Fetched");
          db.query(
            "select members_id from group_members where group_id = ?", [group_id],
            (err, result1) => {
              if (err) {
                console.log(err);
                res.status(401).send({ message: "Error at fetching" });
              }
              else{
                res.status(200).send({message : result, result1});
              }
            }
          );
        //   res.status(200).send({ message: result });
        }
      }
    );
  } catch (err) {
    console.log(err);
    res.status(401).send({ message: "Something went wrong" });
  }
};

let addDescription  = (req,res)=>{
    let group_id = req.body.group_id;
    let description = req.body.description;
    try{
        db.query('update fb_group set description = ? where group_id = ?', [description,group_id], (err,result)=>{
            if(err){
                console.log(err);
                res.status(401).send({message : "Error at updating"})
            }
            else{
                console.log("Description of the group updated");
                res.status(201).send({message : "Description of the group updated"})
            }
        })
    }
    catch(err){
        console.log(err);
        res.status(401).send({message : "Something went wrong"});
    }
}

module.exports = { aboutGroup , addDescription};

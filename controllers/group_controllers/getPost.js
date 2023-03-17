const db = require('../../Util/database');

let getPost /* from group */ = (req,res)=>{
    console.log("You can view post here");
    let group_id = req.body.group_id;
    try{
        db.query('select * from group_post where group_id = ?', [group_id], (err,result)=>{
            if(err){
                console.log(err);
                res.status(401).send({message : "Error at getting post"});
            }
            else if (result.length === 0){
                console.log("No post");
                res.status(201).send({message :" You haven't posted anything "})
            }
            else {
                console.log("Posts are ...");
                res.status(201).send({message : result});
            }
        })
    }
    catch(e){
        console.log(e);
        res.status(401).send({message : "Something went wrong"});
    }
}

module.exports = {getPost}
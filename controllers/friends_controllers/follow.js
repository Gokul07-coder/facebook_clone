const db = require('../../Util/database');

let followPerson = (req,res) => {
    let id = req.body.id;
    let {user_id} = req.user;
    try{
        db.query('Insert into follow values (?,?)', [user_id, id] , (err,result)=>{
            if(err) {
                console.log("Error", err);
                res.status(401).json({message : "unable to request"})
            }
            else{
                res.status(201).json({message : "Okay followed"})
            }
        })
    }
    catch(err){
        console.log("Error at catch");
        console.log(err);
        res.status(401).json({message: "Error at catch"});
    }
}

let unfollowPerson = (req,res)=>{
    let {user_id} = req.user;
    let id = req.body.id;
    try{
        db.query('delete from follow where follower_id = ? and following_id = ?', [user_id,id], (err,result)=>{
            if(err){
                console.log("Error at unfollowing");
                res.status(401).json({message : "Error at unfollowing"});
            }
            else{
                console.log("Unfollowed successfully");
                res.status(201).json({message : `Unfollowed the person ${id}`});
            }
        })
    }
    catch(err){
        console.log("Error at catch", err);
        res.status(401).json({message : "Something went wrong"});
    }
}

module.exports = {followPerson,unfollowPerson};
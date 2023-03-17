let db = require('../../Util/database');

let unfriend = (req,res)=>{
    let {user_id} = req.user;
    console.log(user_id);
    let unfriend_id = req.body.id;
    try{
        db.query('delete from friend where id =?  and friends_id = ?', [user_id,unfriend_id], (err,result)=>{
            if(err){
                console.log("Error at deleting");
                console.log(err);
                res.status(401).json({message : "Error occured"});
            }
            else{
                db.query('delete from friend where id = ?  and friends_id = ?', [unfriend_id,user_id])
                console.log("Deleted");
                res.status(201).json({message : "Removed from your friend"})
            }
        })
    }
    catch(err){
        console.log(err);
        res.status(401).json({message: "Something went wrong"});
    }
}

module.exports = {unfriend}
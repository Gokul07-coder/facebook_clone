const db = require('../../Util/database');

let getFriends = (req,res)=>{
    try{
        let {user_id} = req.user;
        db.query('select first_name,profile from account where id in (select friends_id from friend where id = ? )', [user_id], (err,result)=>{
            if(err){
                console.log("Error at fetching",err);
                res.status(401).json({message : "Error at fetching"});
            }
            else{
                console.log("Information retreived");
                res.status(201).json({result});
            }
        })
    }
    catch{}
}

module.exports = {getFriends}
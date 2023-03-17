let db = require('../../Util/database');
let homePage = (req,res)=>{
    try{
    let {user_id} = req.user;
    db.query('select post_id,image from post where id in (select friends_id from friend where id = ?)', [user_id], (err,result)=>{
        if(err){
            console.log(err);
            req.status.send({message : "Error at fetching"});
        }
        else if(result.length>0){
            console.log("you have feed");
            res.status(201).send(result);
        }
        else{
            console.log("you don't have any here add some friends");
            res.status(201).send({message : "you don't have any here add some friends"});
        }
        })
    }
    catch(e){
        console.log(e);
        res.status(401).send("Something went wrong");
    }
}

module.exports = { homePage }
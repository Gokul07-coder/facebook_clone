const db = require('../../Util/database');

const like = (req,res)=>{
    try{
        let post_id = req.body.post_id;
        let {user_id} = req.user;
        db.query('insert into likes values (?,?)', [post_id,user_id], (err,result)=>{
            if(err){
                console.log(err);
                res.status(401).send({message : "Error at liking"});
            }
            else{
                // console.log("liked");
                // res.status(201).send({message : "Liked the post"});
                db.query('select count(post_id) as likes from likes where post_id = ?', [post_id], (err,result1)=>{
                    console.log("liked");
                    res.status(201).send({message : result1});
                })
            }
        })
    }
    catch(e){
        console.log(e);
        res.status(401).send({message : "Something went wrong"});
    }
}

const removeLike = (req,res)=>{
    try{
        let post_id = req.body.post_id;
        let {user_id} = req.user;
        db.query('delete from likes where post_id = ? and follower_id = ?', [post_id,user_id], (err,result)=>{
            if(err){
                console.log(err);
                res.status(401).send({message : "Error at remove liking"});
            }
            else{
                // console.log("Removed");
                // res.status(201).send({message : "removed the like"});
                db.query('select count(post_id) as likes from likes where post_id = ?', [post_id], (err,result1)=>{
                    console.log("removed");
                    res.status(201).send({message : result1});
                })

            }
        })
    }
    catch(e){
        console.log(e);
        res.status(401).send({message : "Something went wrong"});
    } 
}

const getLikes = (req,res)=>{
    let post_id = req.body.post_id;
    db.query('select post_id,account.first_name from likes left join account on follower_id and follower_id = id where post_id = ?', [post_id], (err,result)=>{
        if(err){
            console.log(err);
            res.status(401).send({message : "error at fetching information"});
        }
        else if(result.length == 0){
            console.log("ok");
            res.status(201).send({message : "No likes yet"});
        }
        else{
            console.log("ok");
            res.status(201).send({message : result});
        }
    })
}

module.exports = { like, removeLike, getLikes };
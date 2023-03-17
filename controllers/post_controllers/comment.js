let db = require('../../Util/database');

let comment = (req,res)=>{
    const content = req.body.content;
    const {user_id} = req.user;
    const post_id = req.body.post_id;
    try{
    db.query('insert into comment (post_id,content,follower_id) values (?,?,?)', [post_id,content,user_id], (err,result)=>{
        if(err){
            console.log(err);
            res.status(401).send({message : "Unable to post the comment"});
        }
        else{
            console.log("ok");
            res.status(201).send({message :'Comment posted successfully'});
        }
    })
}
catch(e){
    console.log(e);
    res.status(401).send({message : "Something went wrong"});
}
}

let deleteComment = (req,res)=>{
    const {post_id,comment_id} = req.body;
    try{
        db.query('delete from comment where post_id = ? and comment_id = ?', [post_id,comment_id], (err,result)=>{
            if(err){
                console.log(err);
                res.status(401).send({message: "Error at deleting the comment"});
            }
            else{
                console.log("ok");
                res.status(201).send({message : "Commented deleted Successfully"});
            }
        })
    }
    catch(e){
        console.log(e);
        res.status(401).send({message : "Something went wrong"});
    }

}

const getComments = (req,res)=>{
    const post_id = req.body.post_id;
    try{
        db.query('select post_id,account.first_name,content from comment left join account on follower_id and follower_id = id where post_id = ?', [post_id], (err,result)=>{
            if(err){
                console.log(err);
                res.send({message : "Error at fetching"}).status(401);
            }
            else if(result.length == 0){
                console.log("ok");
                res.send({message : "No comments yet"}).status(201);
            }
            else{
                console.log("ok");
                res.send({message : result}).status(201);
            }
        })
    }
    catch(e){
        console.log(e);
        res.status(401).send({message : "Something went wrong"})
    }
}

module.exports = { comment, deleteComment, getComments };
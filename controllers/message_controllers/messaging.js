let db = require('../../Util/database');

let sendMessage = (req,res)=>{
    console.log("YOu can send message here");
    const {user_id} = req.user;
    const friend_id = req.body.friend_id;
    const message1 = req.body.message;

    try{
        db.query('insert into message (sender_id,receiver_id,message) values (?,?,?)', [user_id,friend_id,message1], (err,result)=>{
            if(err){
            console.log(err);
            res.status(401).send({message : "Error at sending message"})
            }
            else{
                console.log("message send successfully");
                res.status(201).send({message : "Message send successfully"});
            }
        })
    }
    catch(e){
        console.log(e);
        res.status(401).send({message : "Something went wrong"});
    }
}

let receiveMessage = (req,res)=>{
    const {user_id} = req.user; 
    const friend_id = req.body.friend_id;
    console.log("you can see your messages here");
    try{
        db.query('select message,time from message where receiver_id = ? and sender_id = ?', [user_id,friend_id], (err,result)=>{
            if(err){
                console.log(err);
                res.status(401).send({message : "Error at retrieving messages"});
            }
            else if(result.length == 0){
                console.log("ok");
                res.status(201).send({message : "No messages here"});
            }
            else{
                console.log("ok");
                res.status(201).send({message : result});
            }
        })
    }
    catch(e){
        console.log(e);
        res.status(401).send({message : "Something went wrong"});
    }
}

const deleteMessage = (req,res)=>{
        const {user_id} = req.user;
        const id = req.body.id;
        try{
            db.query('delete from message where sender_id =? and id = ?', [user_id,id], (err,result)=>{
                if(err){
                    console.log(err);
                    res.status(401).send({message : "error at deleting"});
                }
                else{
                    console.log("ok");
                    res.status(201).send({message : "Message deleted successfully"});
                }
            })
        }
        catch(e){
            console.log(e);
            res.status(401).send({message : "Something went wrong"});
        }

}

module.exports = { sendMessage,receiveMessage, deleteMessage };

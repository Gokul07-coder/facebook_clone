const db = require('../../Util/database');

let changeName = (req,res)=>{
    let name = req.body.name;
    let {user_id} = req.user;
    console.log(user_id);
    db.query('update account set first_name = ? where id = ?', [name,user_id], (err,result)=>{
        if(err){
            console.log("Error at updating",err);
            res.json({message : "error at updating"})
        }
        else{
            console.log("Name updated");
            res.json({message : "Name updated"});
        }
    })
}

let addEmail = (req,res)=>{
    let newEmail = req.body.email;
    let {user_id} = req.user;
    db.query('update account set anotherEmail = ?  where email = ?', [newEmail,user_id], (err,result)=>{
        if(err){
            console.log("Error at adding");
            console.log(err);
            res.status(401).json({message : "Error at adding email"})
        }
        else{
            console.log("Successfully added email");
            res.status(201).json({message: "Succesfully added the email"});

        }
    })
};


module.exports = {changeName,addEmail};

// const auth = require('../middleware/authenticate');
const db = require('../Util/database');

let home = (req,res)=>{
    let {user_id} = req.user;
    console.log("hello user "+ user_id);
    db.query('select first_name from account where id = ?', [user_id], (err,result)=>{
        if(err){
            console.log("error at displaying",err);
        }
        else{
            console.log("welcomed user");
            res.json({message : `welcome ${result[0].first_name}`})
        }
    })
    // res.json({message : `Verified user` })
}

// let changeName = (req,res)=>{
//     let name = req.body.name;
//     let {user_id} = req.user;
//     console.log(user_id);
//     db.query('update account set first_name = ? where id = ?', [name,user_id], (err,result)=>{
//         if(err){
//             console.log("Error at updating",err);
//             res.json({message : "error at updating"})
//         }
//         else{
//             console.log("Name updated");
//             res.json({message : "Name updated"});
//         }
//     })
// }

module.exports = {home};



const db = require('../../Util/database');
const express = require('express');

let friendRequests = (req,res)=>{
    try{
        let {user_id} = req.user;
        db.query('select id,first_name,profile from account where id in (select request_id from friend_req where id = ?)', [user_id],(err,result)=>{
            if(err){
                console.log("Error at fetching request");
                res.status(401).json({message  : "Error at fetching details "})
            }
            else if (result.length === 0){
                console.log("No friend Request");
                res.status(201).json({message : "You dont have any request !"})
            }
            else{
                console.log("List of requests..");
                res.status(201).json({result});
            }
        })
    }
    catch{
        console.log("Error at catch");
        res.status(401).json("Something went wrong");
    }
}

let sentRequest = (req,res)=>{
    try{
        let {user_id} = req.user;
        db.query('select account.id,first_name,profile from account where id in(select id from friend_req where request_id = ?)', [user_id], (err,result)=>{
            if(err){
                console.log("Error");
                console.log(err);
            }
            else{
                console.log("result displayed");
                res.status(201).json({message : result});
            }
        })
    }
    catch(err){
        console.log("Error at catch");
        res.status(401).json({message : "Error at catch block"})
    }
}

let acceptRequest = (req,res)=>{

    try{
        let {user_id} = req.user;
        db.query('select request_id from friend_req where id = ?', [user_id], (err,result)=>{
            if(err){
                console.log("Error at fetching request");
                res.status(401).json({message  : "Error at fetching details "})
            }
            else if (result.length === 0){
                console.log("No friend Request");
                res.status(201).json({message : "You dont have any request !"})
            }
            else{
                acceptRequestFromFriend();
            }
        })


        function acceptRequestFromFriend() {
        let req_id = req.body.id;
        let {user_id} = req.user;
        console.log(user_id);
        db.query('INSERT into friend (id,friends_id) values (?,?)', [user_id,req_id], (err,result)=>{
            if(err){
                console.log("Error at adding friends : ",err);
                res.status(401).json({message : "Error at adding friend"})
            }
            else{
                db.query('INSERT INTO friend (id,friends_id) values (?,?)', [req_id,user_id], (err,result)=>{
                    if(err) console.log("Error at mapping friends",err);
                    else{
                        console.log("mapped");
                        db.query('insert into follow values (?,?)', [user_id,req_id], (err,resu)=>{
                            if(err){
                                console.log("Error at inserting into follow table");
                                console.log(err);
                            }
                            else
                            {
                                db.query('insert into follow values (?,?)', [req_id,user_id], (err,resu)=>{
                                    if(err){
                                        console.log("Error at inserting into follow table");
                                        console.log(err);
                                    }
                                    else{
                                        console.log("follow added");
                                    }
                                })
                            }
                        })
                    }
                })
                db.query('delete from friend_req where request_id = ?', [req_id], (err,result)=>{
                   if(err) console.log("error at removing request from table");
                   else console.log("Success");
                })
                res.status(201).json({message : "Friend added ..."});
            }
        })
        }
    }
    catch{
        console.log("Error at catch");
        res.status(401).json({message : "Error at catch"});
    }
}


let removeRequest = (req,res)=>{
    try {
        let req_id = req.body.id;
        db.query('delete from friend_req where request_id = ?', [req_id], (err,result)=>{
            if(err){
                console.log("Error at deleting request", err);
                res.status(401).json({message : "Error "})
            }
            else{
                console.log("removed from friend request");
                res.status(201).json({message : "Request Removed"});
            }
        })
    }
    catch {
        console.log("Error at catch");
        res.status(401).json({message : "Something went wrong"});
    }
}


module.exports = {friendRequests,acceptRequest,removeRequest,sentRequest};
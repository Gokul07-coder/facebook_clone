const mysql = require('mysql');
const express = require('express');
const env = require('dotenv').config();

const db = mysql.createConnection(
    {
        host : process.env.DATABASE_HOST,
        user : process.env.DATABASE_USER,
        password : process.env.DATABASE_PASSWORD,
        database : process.env.DATABASE
    }
) 

db.connect((err)=>{ 
    if(err) console.log("Connection Failed", err);
    else console.log("Connection Success");
})

module.exports = db;
const jwt = require('jsonwebtoken');

let refToken = (req,res,next)=>{
    const token = req.headers.authorization?.split(' ')[1];
    // console.log(token);
    if(token){
      jwt.verify(token, "secret" ,(err,decoded)=>{
          if(err) res.status(401).json({ message: 'Invalid token.' });
          else{
        req.user = decoded;
        next();
          }
      })
    }else{
      res.status(401).json({ message: 'Missing token.' })
    }
  }

  module.exports =  {refToken};
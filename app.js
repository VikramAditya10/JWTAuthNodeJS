const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();
app.get('/api',(req,res) => {
res.json({
  message:'hello world'
});
 });
 app.post('/api/post',verifyToken,(req,res)=>{
jwt.verify(req.token,'secretkey',{expiresIn:'30s'},(err,authData)=>{
  if(err){
    res.sendStatus(403);
  }else {
    res.json({
      message:'Post created',
      data: authData
    });
    console.log(authData.user);
  }
});

 });

app.post('/api/login',(req,res)=>{
// Mock user
const user={
  id :1,
  username: 'brad',
  email: 'brad@gmail.com'
}
   jwt.sign({user:user},'secretkey',(err,token)=>{
     res.json ({

       token: token
     });
   });
 });
//Authorization: Bearer access_token
 function verifyToken(req,res,next){
//get the auth header value
const bearerHeader = req.headers['authorization'];
   // check if bearer is undefine
  // console.log(bearerHeader);
   if(typeof bearerHeader !== 'undefined'){
const bearer = bearerHeader.split(' ');
const bearerToken=bearer[1];
req.token= bearerToken;
next();
   }else{
     console.log("invalid token from post");
     res.sendStatus(403);
   }
 }
app.listen(5001,()=>console.log('Server started on port 5001'));

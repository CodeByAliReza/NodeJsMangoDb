const express = require("express");

const app = express()




//Middleware 
app.use(function(req,res,next){
  console.log("Middleware is running ");
  next();
  
});

//hum routes create krskte hn <ROUTING>
app.get('/', function(req, res) {
  res.send('CHAMPIONS MERE BHAI ')
})
app.get('/submit' , function(req,res){
  res.send('FORM SUBMITTED SUCCESSFULLY')
})

//session and Cookies
 


  
app.listen(3002 , () => {
  console.log('Server is running on http://localhost:3002')
})
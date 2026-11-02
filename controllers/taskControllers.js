// 1. DATA (Fake Database)
const HttpStatus = require("../utils/httpStatus");
const Task = require("./task_model/taskModel");


const getAllTask =async function(req, res) {
   try{  const query =  Task.find();
const allTask = await query.select("-__v");
  return res.status(HttpStatus.OK).json({
    status: "success",
    message: "Data fetched successfully",
    data: {
      users: allTask,
      totalUsers: allTask.length,
      currentDate: new Date().toISOString(),
    }
  });}catch(e){
    res.status(HttpStatus.NOT_FOUND).json({
      status : 'fail',
      message : e.message
    })

   }
  

}
const getUserById = async function(req, res) {

    let id = req.params.id;

    let foundUser = await Task.findById(id).exec();
    
    
      res.status(HttpStatus.OK).send(
        {

          "status": "success",    
          "message": "User fetched successfully",
          "user": found,
        }
        
        );
  
}
const postUser = async function(req, res) {
  let body = req.body;
  console.log("body:",body);


  const newUser=  await Task.create(
    {
      ...body,
    }
   )

  if(!body.name || !body.designation){
    return res.status(HttpStatus.BAD_REQUEST).json({
      status: "error",
      message: "User name and designation required",
    });
  }
  users.push(newUser);

  return res.status(HttpStatus.CREATED).json({
    status: "success",
    message: "User created successfully",
    user:   {
  newUser :     newUser
    } 
  });
  


}
const patchUser= async function(req, res) {

let id = req.params.id;

let foundUser = await Task.findByIdAndUpdate(id, req.body,{
  new:true
});

if(!foundUser){
  return res.status(404).json({
    status: "error",
    message: "User Not Found",
  });
}



return res.status(200).json({
  status: "success",
  message: "User updated successfully",
  newUser: foundUser
});
}
const putUser = function(req, res) {
  let body = req.body;
  let userId = Number(req.params.id);

  // 1. Index find karein
  let foundIndex = users.findIndex(user => user.id === userId);

  // 2. Agar user exist nahi karta toh yahin se return karein
  if (foundIndex === -1) {
    return res.status(HttpStatus.NOT_FOUND).json({
      status: "error",
      message: "User not found",
    });
  }

  // 3. PUT request poore object ko replace ya update karti hai
  // (ID wahi rahegi jo param se aayi hai, baki data body se aayega)
  users[foundIndex] = {
    id: userId,
    name: body.name,
    designation: body.designation,
  };

  // 4. Success response return karein
  return res.status(HttpStatus.OK).json({
    status: "success",
    message: "User updated successfully",
    user: users[foundIndex],
  });
}
const getUserByParams = (req,res,next)=>{

  let designation = req.query.designation;
  let id = req.query.id;
  let userId = Number(id)
  if(!designation && !id){
     return next();
  }
 let foundUser = users.find(u=> u.designation === designation);
let foundId = users.find(i=>i.id === userId);

 if(foundUser || foundId){
    return res.status(HttpStatus.OK).json(
        {
            status:"success",
            message:"User fetched successfully",
            user: foundUser || foundId
        }
    );

 }else{

  return res.status(HttpStatus.NOT_FOUND).json(
    {
    status: "error",
    message: "User Not Found",

  });

 }
}
const deleteUser = async function(req, res) {
  try {
    let id = req.params.id;

    let foundUser = await Task.findByIdAndDelete(id);

    // Agar user nahi mila toh null hoga, is liye !foundUser check karein
    if (!foundUser) {
      return res.status(404).json({
        status: "error",
        message: "User Not Found",
      });
    }

    return res.status(200).json({
      status: "success",
      message: "User deleted successfully",
      user: foundUser,
    });

  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message
    });
  }
}
module.exports = {
    getAllTask, getUserById, postUser, patchUser, putUser, getUserByParams, deleteUser
}
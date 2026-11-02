const mongoose = require("mongoose")

let taskSchema = new mongoose.Schema({

  name : {
    type : String,
    required : "[true, 'name is required']",
    },

 designation: {
  type: String,
  required: [true, "designation is required"],
  enum: {
    values: ["Software Engineer", "Data Scientist", "Project Manager"],
    message: "{VALUE} allowed nahi hai, sirf list me se select karein" // Custom error message
  }
},
}, {
  timestamps:true,
}

);

const Task = mongoose.model("task", taskSchema);
module.exports = Task;
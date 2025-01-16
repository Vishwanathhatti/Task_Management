import mongoose from "mongoose";

const taskSchema = mongoose.Schema(  
    {
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    title: {
      type: String,
      required: [true, "Task title is required"],
    },
    description: {
      type: String,
      required: [true, "Task description is required"],
    },
    status: {
      type: String,
      enum: ["Pending", "In Progress", "Completed"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

const taskModel = mongoose.model("Task", taskSchema);

export default taskModel;
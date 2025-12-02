import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            enum: ["Pending", "Completed"],
            default: "Pending",
        },
        userId: {
            type: String, 
            required: true,
        },
         assignedBy: {
      type: String, 
      default: null,
    },
    userName:{
        type:String,
        default:null
    }
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("Task", TaskSchema);

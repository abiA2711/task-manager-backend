import Task from "../models/taskModel.js";

export const createTask = async (req, res) => {
  try {
    const { title, description, status, userId, role,userName } = req.body;

    if (!title || !description || !userId) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Build task object
    let taskData = {
      title,
      description,
      status: status || "Pending",
      userId,
      userName
    };

    // If admin → add assignedBy field as "AdminName[admin]"
    if (role === "Admin") {
      const adminName = req.body.adminName;
      const userName=req.body.userName
      taskData.userName=userName
      taskData.assignedBy = `${adminName}[admin]`;
    }
    console.log(taskData)
    
    const newTask = await Task.create(taskData);

    res.status(201).json({
      message: "Task created successfully",
      data: newTask,
    });
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


export const updateTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    
    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      {
        ...req.body,          // title, description
        updatedAt: new Date() // auto timestamp update
      },
      { new: true }
    );

    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getTasks = async (req, res) => {
  try {
    const role = req.query.role;
    const userId = req.query.userId;
  

    let tasks;

    if (role === "Admin") {
      tasks = await Task.find().sort({ createdAt: 1 });
    } else {
      tasks = await Task.find({ userId }).sort({ createdAt: 1 });
    }

    return res.status(200).json(tasks);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const { role } = req.body; // send role in body

    if (role !== "Admin") {
      return res.status(403).json({ message: "Only admin can delete tasks" });
    }

    const task = await Task.findById(taskId);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    await Task.findByIdAndDelete(taskId);

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error("Task deletion failed:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

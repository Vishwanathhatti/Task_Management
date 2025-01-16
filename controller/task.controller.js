import taskModel from "../models/task.model.js"

export const createTask = async (req,res)=>{
    const {title, description, status} = req.body
    try {
        if (!title || !description || !status){
            return res.status(400).json({
                message:"Something is missing",
                success: false
            })
        }

        const userId = req.id

        const task = await taskModel.create({
            user:userId,
            title,
            description,
            status
        })
        res.status(200).json({
            message:'Task created successfully',
            task,
            success: true
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            message:`Error: ${error}`,
            success: false
        })
    }
}


export const updateTask = async (req,res) =>{
    const {title, description, status} = req.body
    try {
        const taskId = req.params.id
        const userId = req.id

        const task = await taskModel.findOne({_id: taskId, user: userId})
        if (!task){
            return res.status(400).json({
                message:'Task not found or you do not have permission to update it',
                success:false
            })
        }
        task.title = title || task.title
        task.description = description || task.description
        task.status = status || task.status

        await task.save()
        return res.status(200).json({
            message:'Task updated successfully',
            task,
            success: true
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            message:`Error: ${error}`,
            success: false
        })
    }
}


export const getAllTasks = async(req,res)=>{
    try {
        const task = await taskModel.find().populate("user","email")
        res.status(200).json({
            success:true,
            task
        })
    } catch (error) {
        res.status(500).json({
            message:`Error: ${error}`,
            success:false
        })
    }
}

export const getTaskById = async(req,res)=>{
    console.log('started')
    const { id } = req.params;

    try {
      const task = await taskModel.findById(id).populate("user", "email");
  
      if (!task) {
        return res.status(404).json({
          success: false,
          message: "Task not found",
        });
      }
  
      res.status(200).json({
        success: true,
        data: task,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to retrieve the task",
        error: error.message,
      });
    }
}

export const deleteTask = async (req, res) => {
    const { id } = req.params;
  
    try {
      const task = await taskModel.findByIdAndDelete(id);
  
      if (!task) {
        return res.status(404).json({
          success: false,
          message: "Task not found",
        });
      }
  
      res.status(200).json({
        success: true,
        message: "Task deleted successfully",
        task,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to delete the task"
      });
    }
  };
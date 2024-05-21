const Task = require("../model/Task");

const taskController = {};

taskController.createTask = async (req, res) => {
  try {
    const { task, isComplete } = req.body;

    const newTask = new Task({ task, isComplete });
    await newTask.save();
    res.status(200).json({ status: "ok", data: newTask });
  } catch (err) {
    res.status(400).json({ status: "fail", error: err });
  }
};

taskController.getTask = async (req, res) => {
  try {
    const taskList = await Task.find({}).select("-__v");
    res.status(200).json({ status: "ok", data: taskList });
  } catch (err) {
    res.status(400).json({ status: "fail", error: err });
  }
};

taskController.putTask = async (req, res) => {
  try {
    var params = req.params;
    const task = await Task.findOne({ _id: params.id }); // findOne 사용

    if (!task) {
      return res.status(404).json({ status: "fail", error: "Task not found" });
    }

    const taskResult = await Task.updateOne(
      { _id: params.id },
      { $set: { isComplete: !task.isComplete } }
    );
    res.status(200).json({ status: "ok", data: taskResult });
  } catch (err) {
    res.status(400).json({ status: "fail", error: err });
  }
};

taskController.deleteTask = async (req, res) => {
  try {
    var params = req.params;
    const deleteTask = await Task.deleteOne({ _id: params.id });

    res.status(200).json({ status: "ok", data: deleteTask });
  } catch (err) {
    res.status(400).json({ status: "fail", error: err });
  }
};

module.exports = taskController;

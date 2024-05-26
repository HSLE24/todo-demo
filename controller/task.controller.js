const Task = require("../model/Task");

const taskController = {};

taskController.createTask = async (req, res) => {
  try {
    const { task, isComplete } = req.body;

    const { userId } = req;

    const newTask = new Task({ task, isComplete, author: userId });
    await newTask.save();
    res.status(200).json({ status: "ok", data: newTask });
  } catch (err) {
    res.status(400).json({ status: "fail", error: err.message });
  }
};

taskController.getTask = async (req, res) => {
  try {
    const { userId } = req;
    const taskList = await Task.find({ author: userId })
      .select("-__v")
      .populate("author");
    res.status(200).json({ status: "ok", data: taskList });
  } catch (err) {
    res.status(400).json({ status: "fail", error: err.message });
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
    res.status(400).json({ status: "fail", error: err.message });
  }
};

taskController.deleteTask = async (req, res) => {
  try {
    var params = req.params;
    const deleteTask = await Task.deleteOne({ _id: params.id });

    res.status(200).json({ status: "ok", data: deleteTask });
  } catch (err) {
    res.status(400).json({ status: "fail", error: err.message });
  }
};

module.exports = taskController;

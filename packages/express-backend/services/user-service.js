import userModel from "../models/user.js";

function getUsers(name, job) {
  let filter = {};

  if (name) {
    filter.name = name;
  }

  if (job) {
    filter.job = job;
  }

  return userModel.find(filter);
}

function findUserById(id) {
  return userModel.findById(id);
}

function addUser(user) {
  const userToAdd = new userModel(user);
  return userToAdd.save();
}

function findUserByName(name) {
  return userModel.find({ name: name });
}

function findUserByJob(job) {
  return userModel.find({ job: job });
}

function deleteUserById(id) {
  return userModel.findByIdAndDelete(id);
}

export default {
  addUser,
  getUsers,
  findUserById,
  findUserByName,
  findUserByJob,
  deleteUserById
};
const fs = require("fs");
const path = require("path");
const uuid = require("uuid");

// Helper function to read user data from user.json
const readUserData = callback => {
  fs.readFile(path.join(__dirname, '..', 'user.json'), 'utf8', callback);
};

// Helper function to write user data to user.json
const writeUserData = (data, callback) => {
  fs.writeFile(path.join(__dirname, '..', 'user.json'), JSON.stringify(data, null, 2), callback);
};
exports.getAllUsers = (req, res) => {
  // ... (code remains the same)
};
exports.getUserById = (req, res) => {
  // ... (code remains the same)
};
exports.createUser = (req, res) => {
  // ... (code remains the same)
};
exports.updateUser = (req, res) => {
  // ... (code remains the same)
};
exports.deleteUser = (req, res) => {
  // ... (code remains the same)
};
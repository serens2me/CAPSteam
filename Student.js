const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  studentId: String,
  attendance: String,
  upcomingClass: {
    subject: String,
    time: String
  },
  results: {
    subject: String,
    percentage: String
  }
});

module.exports = mongoose.model('Student', studentSchema);

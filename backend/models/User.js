const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  contactNumber: {
    type: String,
    required: true,
  },
  token: {
    type: String,
  },
  resetPasswordExpires: {
    type: Date,
  },
  role: {
    type: String,
    enum: ['Recruiter', 'User'],
    default: 'User',
  },
  jobs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Job',
    },
  ], 
  applications: [
    {
      job: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Job',
        required: true,
      },
      appliedDate: {
        type: Date,
        default: Date.now,
      },
    },
  ], 
},
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);

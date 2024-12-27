/** @format */

const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid'); // Importing UUID library

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },

    UID: {
      type: String,
      required: true,
      unique: true,
      default: uuidv4, // Automatically generates a unique UID on creation
    },

    userPoints: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

// Pre-save hook to ensure UID is always set if not provided
userSchema.pre('save', function (next) {
  if (!this.UID) {
    this.UID = uuidv4(); // Generate UID if it is not already set
  }
  next();
});

module.exports = mongoose.model('User', userSchema);

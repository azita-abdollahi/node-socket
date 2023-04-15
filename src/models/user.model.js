const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const Schema = mongoose.Schema;

const userSchema = new Schema ({
    name: {
        type: String,
        required: "name is required."
    },
    email: {
        type: String,
        required: "email is required."
    },
    password: {
        type: String,
        required: "password is required"
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});
userSchema.pre('save', async function (next) {
    if (this.isModified('password') || this.isNew) {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(this.password, salt);
        this.password = hash;
      }
      next();
  });
  
  userSchema.methods.comparePassword  = async function () {
    return await bcrypt.compare(password, this.password);
  };
module.exports = mongoose.model('User', userSchema);
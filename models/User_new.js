//import { Schema, model } from "mongoose";
const {Schema, model}=require('mongoose');
//import bcrypt from "bcryptjs";
const bcrypt=require('bcryptjs');

const UserSchema = new Schema(
  {
    name: 
      { type: String, 
      trim: true },
    email: { type: String,      required: true, unique: true, trim: true },
    password: { type: String, required: true },
    date: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

UserSchema.methods.encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

UserSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};


//export default model("User", UserSchema);
model.exports.User=User;
model.exports.UserSchema=UserSchema;
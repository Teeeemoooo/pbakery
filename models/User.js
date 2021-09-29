const mongoose=require('mongoose');
const{Schema}=mongoose;
const bcrypt= require('bcryptjs');
const UserSchema=new Schema({
    name:{type:String, required:true},
    email:{type:String, required:true},
    password:{type:String, required:true},
    confirm_password:{type:String, required:true},
});

//I. add a method (function) encryptPassword to the Schema
UserSchema.methods.encryptPassword=async (password)=>{
    const salt=await bcrypt.genSalt(10);
    //console.log('INSIDE BEFORE encryptPassword:', password);
    const hash=bcrypt.hash(password, salt);
    return hash;
};

//II. add a method to compate passwords (input vs db) ; do not use arrow , use ECMA5 because we need the scope (using 'this')
UserSchema.methods.matchPassword =async function(password){
    return await bcrypt.compare(password, this.password);
};


module.exports=mongoose.model('User',UserSchema);

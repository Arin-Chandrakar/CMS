const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

mongoose.connect('mongodb://127.0.0.1/my_database');

const Schema=mongoose.Schema;
const ObjectId=Schema.ObjectId;

const userSchema= Schema({
    userId:ObjectId,
    email:String,
    password:String,
    firstName:String,
    lastName:String
});

const adminSchema=Schema({
    email:String,
    password:String,
    firstName:String,
    lastName:String
});

const courseSchema=Schema({
    title:String,
    description:String,
    price:Number,
    imageUrl:String,
    creatorId:ObjectId
});

const purchaseSchema=Schema({
    userId:ObjectId,
    courseId:ObjectId
});

const userModel=mongoose.Model("User",userSchema);
const adminModel=mongoose.Model("admin",adminSchema);
const courseModel=mongoose.Model("course",courseSchema);
const purchaseModel=mongoose.Model("purchase",purchaseSchema);

module.exports={
    userModel, adminModel, courseModel, purchaseModel
}
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

mongoose.connect('mongodb+srv://arinch:thwxpcRUeC2djbCZ@cluster0.twn04.mongodb.net/coursehub');

const Schema=mongoose.Schema;
const ObjectId=Schema.ObjectId;

const userSchema=new Schema({
    userId:ObjectId,
    email:String,
    password:String,
    firstName:String,
    lastName:String
});

const adminSchema=new Schema({
    email:String,
    password:String,
    firstName:String,
    lastName:String
});

const courseSchema=new Schema({
    title:String,
    description:String,
    price:Number,
    imageUrl:String,
    creatorId:ObjectId
});

const purchaseSchema=new Schema({
    userId:ObjectId,
    courseId:ObjectId
});

const userModel=mongoose.model("User",userSchema);
const adminModel=mongoose.model("admin",adminSchema);
const courseModel=mongoose.model("course",courseSchema);
const purchaseModel=mongoose.model("purchase",purchaseSchema);

module.exports={
    userModel, adminModel, courseModel, purchaseModel
}
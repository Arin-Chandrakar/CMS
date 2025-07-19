const{Router}=require("express");
const courseRouter=Router();
const { userAuthentication }=require("../middleware/userAuth");
const { purchaseModel,courseModel } = require("../db");

courseRouter.post("/purchase",userAuthentication,async function(req,res){
    const userId=req.userId;
    const courseId=req.body.courseId;

    await purchaseModel.create({
        userId,
        courseId
    })

    res.json({
        message:"You have successfully bought the course"
    })
})



courseRouter.post("/preview",async function(req,res){
    const courses = await courseModel.find({});

    res.json({
        courses
    })
})    

module.exports={
    courseRouter:courseRouter
}
const express=require("express");
const JWT=require("jsonwebtoken");
const mongoose=require("mongoose");
const app=express();
const {userRouter}=require("./routes/user");
const {courseRouter}=require("./routes/course");

app.use("/user",userRouter);
app.use("/course",courseRouter);

// createUserRoutes(app);
// createCourseRoutes(app);

app.get("/",function(req,res){

})

app.listen(5000);
const express=require("express");
const JWT=require("jsonwebtoken");
const mongoose=require("mongoose");
const app=express();
const {userRouter}=require("./routes/user");
const {courseRouter}=require("./routes/course");
const {adminRouter}=require("./routes/admin");


app.use(express.json());
app.use("/user",userRouter);
app.use("/course",courseRouter);
app.use("/admin",adminRouter);

// createUserRoutes(app);
// createCourseRoutes(app);

app.get("/",function(req,res){

})

app.listen(5000);
const {Router}=require("express");
const z =require("zod")
const {userModel, purchaseModel, courseModel}=require("../db")
const { JWT_USER_SECRET } = require("./config")
const jwt=require("jsonwebtoken");
const userRouter=Router();
const bcrypt=require("bcrypt");
const { userAuthentication }=require("../middleware/userAuth")

userRouter.post("/signup", async function(req,res){
    const input=z.object({
        email:z.string(),
        password:z.string(),
        firstName:z.string(),
        lastName:z.string()
    });
    const parsedData=input.safeParse(req.body)
    
    
    if(!parsedData.success){
        return res.json({
            message:"Input format is wrong"
        });
    }
    
    const{email,password,firstName,lastName}=parsedData.data
    const hashedPassword=await bcrypt.hash(password,5,);

    await userModel.create({
        email:email,
        password:hashedPassword,
        firstName:firstName,
        lastName:lastName
    })
    return res.json({
        message:"Signup Successful"
    })

})
userRouter.post("/signin",async function(req,res){
    const {email,password}=req.body;
    const response=await userModel.findOne({
        email:email,
    });
    if(!response){
        res.status(400).json({
            message:"Inavlid credentials"
        })
    }

    const passwordMatch=await bcrypt.compare(password,response.password);
    if(passwordMatch){
        const token=jwt.sign({
            id:response._id
        },JWT_USER_SECRET);
        res.json({
            token:token,
            message:"signin successful"
        })
    }
    else{
        res.status(403).json({
            message:"invalid credentials"
        })
    }
})
userRouter.get("/purchases",userAuthentication,async function(req,res){
    const userId=req.userId;

    const purchases= await purchaseModel.find({
        userId
    });

    let purchasedCourseIds=[];

    for(let i=0; i<purchases.length;i++){
        purchasedCourseIds.push(purchases[i].courseId)

    }


    const courseData= await courseModel.find({
        _id: {$in: purchasedCourseIds}
    })
    

    res.json({
        purchases,courseData
    })
})



module.exports={
    userRouter:userRouter
}
const {Router}=require("express");
const z =require("zod")
const {userModel}=require("../db")
const JWT_USER_SECRET="Iamnotgay"
const jwt=require("jsonwebtoken");
const hashSecret="messigoat123"
const userRouter=Router();
const bcrypt=require("bcrypt");
const { userAuth }=require("../middleware/userAuth")

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
userRouter.post("/purchases",userAuth,async function(req,res){
    const purchasedCourses=
    res.json({
        message:"purchase endpoint"
    })
})



module.exports={
    userRouter:userRouter
}
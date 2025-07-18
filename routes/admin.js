const {Router}=require("express");

const adminRouter=Router();

const {adminModel}=require("../db")
const z =require("zod");
const bcrypt=require("bcrypt");
const JWT_ADMIN_SECRET="Iamgay";
const jwt=require("jsonwebtoken");

// adminRouter.use(adminMiddleware)

adminRouter.post("/signup",async function(req,res){
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

    await adminModel.create({
        email:email,
        password:hashedPassword,
        firstName:firstName,
        lastName:lastName
    })
    return res.json({
        message:"Signup Successful"
    })
})

adminRouter.post("/signin",async function(req,res){
    const {email,password}=req.body;
    const response=await adminModel.findOne({
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
        },JWT_ADMIN_SECRET);
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

adminRouter.post("/course",function(req,res){
    res.json({
        message:"signup endpoint"
    })
})

module.exports={
    adminRouter:adminRouter
}
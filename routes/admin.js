const {Router}=require("express");

const adminRouter=Router();

adminRouter.use(adminMiddleware)

adminRouter.post("/signup",function(req,res){
    res.json({
        message:"signup endpoint"
    })
})

adminRouter.post("/signin",function(req,res){
    res.json({
        message:"singin endpoint"
    })
})

adminRouter.post("/course",function(req,res){
    res.json({
        message:"signup endpoint"
    })
})

module.exports={
    adminRouter:adminRouter
}
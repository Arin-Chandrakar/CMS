const{Router}=require("express");
const courseRouter=Router();

courseRouter.post("/preview",function(req,res){
    res.json({
        message:"preview endpoint"
    })
})



courseRouter.post("/purchase",function(req,res){
    res.json({
        message:"purchase endpoint"
    })    
})    

module.exports={
    courseRouter:courseRouter
}
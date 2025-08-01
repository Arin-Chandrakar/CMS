const jwt=require("jsonwebtoken");
const JWT_ADMIN_SECRET="Iamgay";

function adminAuthentication(req,res,next){
    const token=req.headers.token;
    const decoded=jwt.verify(token,JWT_ADMIN_SECRET);

    if(decoded){
        req.userId=decoded.id;
        next();
    }else{
        res.status(403).json({
            message:"You are not the signed in"
        })
    }
}

module.exports={
    adminAuthentication:adminAuthentication
}
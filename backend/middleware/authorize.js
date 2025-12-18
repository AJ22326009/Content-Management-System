const authorize =(requiredPermission)=>{
    return (req,res,next)=>{
        if(!req.user){
            return res.status(401).json({message:'user not logged in'});
        }

        // console.log('Permissions:', req.user.role?.permissions);
        const permissions=req.user.role?.permissions || [];
        
        const hasPermission=permissions.some(p=>p.name===requiredPermission);

        if(!hasPermission){
            return res.status(403).json({message:'forbidden: you do not have permission'});
        }

        next();
    };
};

module.exports=authorize;
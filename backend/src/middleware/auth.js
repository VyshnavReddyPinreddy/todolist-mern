export function auth(req,res,next){
    if(!req.session.userId){
        return res.status(401).json({msg:'Not authenticated!'});
    }
    next();
}
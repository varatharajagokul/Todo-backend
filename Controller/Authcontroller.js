const User = require('../Modal/Users');
const bcrypt=require('bcryptjs');
const jwt =require('jsonwebtoken');

const signUp = (req,res,next)=>{
    bcrypt.hash(req.body.password,10,async(err,hashedpass)=>{
        if(err){
            res.json({
                error:err
            })
        }
        let user=await User.findOne({email:req.body.email});
        if(user){
            res.json({  
                message:"already exit"
            })
        }else{
            user =new User({
                name:req.body.name,
                email:req.body.email,
                mobile:req.body.mobile,
                password:hashedpass
            })
            await user.save().then(user=>{
                res.json({
                    message:"user added sucessfully"
                })
            }).catch(error=>{
                res.json({
                    message:"an error occured"
                })
            })
        }
         
        
    })
}

const login =(req,res,next)=>{
    var username=req.body.username
    var password=req.body.password

    User.findOne({email:username}).then(user=>{
        if(user){
            bcrypt.compare(password,user.password,function(err,result){
                if(err){
                    res.json({error:err})
                }if(result){
                    let token = jwt.sign({name:username, id:user._id},'A)(BSecret',{expiresIn:'1hr'})
                    res.json({
                        message:"login successfully",
                        token
                    })
                }else{
                    res.json({
                        message:"check user name and password"
                    })
                }
            })
        }else{
            res.json({
                message:"no user found"
            })
        }
    })
}

module.exports={signUp,login}
const express = require("express")
const router  = express.Router();
const Post = require("../models/Post")
const User = require("../models/User")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const adminLayout = '../views/layouts/admin';
const jwtSecret = process.env.JWT_SECRET;

// check for login 
const authMiddleware = (req,res,next)=>{
    const token = req.cookies.token;
    if(!token){
        return res.status(401).json({message:"Unauthorized"});
    }
    try{
        const decoded = jwt.verify(token, jwtSecret);
        req.user = decoded.userId;
        next();
    } catch(error){
        res.status(401).json({message:"unauthorized"});
    }
}

router.get("/admin",async(req,res)=>{
    try { 
        const locals = {
            title:"Admin",
            description: "Simple Blog created with NodeJs , Express and MongoDb",
        }
        res.render("admin/index",{locals,layout: adminLayout})
    } catch (error) {
        console.log(error);
    }
})

router.post("/admin",async(req,res)=>{
    try { 
        const {username, password}= req.body;
        const user = await User.findOne({username});
        if(!user){
            return res.status(401).json({message:"Invalid Credentials"});
        }
        const isPasswordValid = await bcrypt.compare(password,user.password);
        if(!isPasswordValid){
            return res.status(401).json({message:"Invalid Credentials"});
        }

        const token = jwt.sign({userId: user._id},jwtSecret);
        res.cookie('token',token,{httpOnly:true});
        res.redirect('/dashboard');
    } catch (error) {
        console.log(error);
    }
})

router.get('/dashboard',authMiddleware,async(req,res)=>{
    try {
        const locals = {
            title:"Dashboard",
            description: "Simple Blog created with NodeJs , Express and MongoDb",
        }
        // Pagination System of the site
    let perPage = 10; // setting the limit you want to show on home page
    let page = req.query.page || 1; // setting the page you want to show on i.e., https://localhost:3000?page=2

    const data = await Post.aggregate([{$sort:{createdAt:-1}}])
    .skip(perPage*page - perPage)
    .limit(perPage)
    .exec();

    const count = await Post.countDocuments();
    const nextPage = parseInt(page)+1;
    const hasNextPage = nextPage <=Math.ceil(count/perPage);
    res.render("admin/dashboard",{ locals,
        data,
        current:page,
        layout: adminLayout,
        nextPage: hasNextPage?nextPage:null});
    } catch(err){
        console.log(err);
    }   
})

router.get('/add-post',authMiddleware,async(req,res)=>{
    try {
        const locals = {
            title:"Add Post",
            description: "Simple Blog created with NodeJs , Express and MongoDb",
        }
    const data = await Post.find();
    res.render("admin/add-post",{ locals,data,layout: adminLayout,});
    } catch(err){
        console.log(err);
    }   
})

router.post('/add-post',authMiddleware,async(req,res)=>{
    try {
        // console.log(req.body)
        try{
            const newpost = new Post ({
                title: req.body.title,
                body: req.body.body
            });
            await Post.create(newpost);
            res.redirect('/dashboard');
        }catch(err){
            console.log(err);
        }
         
    } catch(err){
        console.log(err);
    }   
})

router.get("/edit-post/:id",authMiddleware,async(req,res)=>{
    try{
        const locals = {
            title: "Edit Post",
            description: "Simple Blog created with NodeJs , Express and MongoDb",
        }
        const data = await Post.findById(req.params.id);
        res.render("admin/edit-post.ejs",{locals,data,layout: adminLayout})
    }catch(err){
        console.log(err);
    }
})


router.put('/edit-post/:id',authMiddleware,async(req,res)=>{
    try {
        await Post.findByIdAndUpdate(req.params.id,{
            title:req.body.title,
            body:req.body.body,
            updateAt: Date.now()
        })
        res.redirect(`/edit-post/${req.params.id}`);
    } catch(err){
        console.log(err);
    }   
})

router.delete('/delete-post/:id',authMiddleware,async(req,res)=>{
    try {
        await Post.deleteOne({_id:req.params.id});
        res.redirect('/dashboard');
    } catch (error) {
        console.log(error)
    }
})

router.post("/register",async(req,res)=>{
    try { 
        const {username, password}= req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        try {
            const user = await User.create({username,password:hashedPassword});
            res.status(201).json({message: 'User Created',user})
        } catch (error) {
            if(error.code===11000){
                res.status(409).json({message:'user already in use'});
            }
            res.status(500).json({message:"server error"});
        }
    } catch (error) {
        console.log(error);
    }
})

router.get('/logout',(req,res)=>{
    res.clearCookie('token');
    res.redirect("/")
})


module.exports = router; 
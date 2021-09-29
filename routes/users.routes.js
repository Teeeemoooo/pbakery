const { text } = require('express');
const { request } = require('express');
const express =require('express');
const router = express.Router();
const passport=require('passport');

const User=require('../models/User');
const {isAuthenticated}=require('../helpers/auth');
// Routes
router.get('/users/signup',(req,res)=>{                    //B
  res.render('users/signup');
});

router.post('/users/signup', async(req,res)=>{                   //B'
  console.log(" request body: ", req.body);
  const{name,email, password,confirm_password}=req.body;
  const errors=[];
  //res.send('Signed up- send Registration Form  to server');
  if(!name){ 
    errors.push({text:'Please enter a username'});
  }


  if(!email){
    errors.push({text:'Please enter a valid email'});
  }
  if(!password){
    errors.push({text:'Please enter a password'});
  }
  if(!confirm_password){
    errors.push({text:'Please confirm your password'});
  }
  if (password!=confirm_password){
    errors.push({text:'passwords do not match'});
  }
  if(password.length<4){
    errors.push({text:'Password mmust be 4 or more characters long'});
  }

  if (errors.length > 0) {
    res.render('users/signup',{
      name,
      email,
      password,
      confirm_password,
      errors
    });
    //res.send('ok');
  } else{ //write account to Mongo
    const emailUser=await User.findOne({email:email});
    if(emailUser){
      req.flash('error_msg','This emailis already in use');
      res.redirect('/users/signup');
    }
    const newUser = new User({name, email, password,confirm_password});
    //res.send('write account to Mongo');
    newUser.password= await newUser.encryptPassword(password);
    await newUser.save();
    req.flash('success_msg','Your User Account Has Been Created Sucessfully');
    res.redirect('/users/signin');
  }

});
//**********EDIT USER ACCOUNT */

router.get('/users/edit-user', isAuthenticated, async (req,res)=>{
  res.render('./users/edit-user');
  /*
  const account= await User.findById(req.params.id).lean();
  console.log('db name', account.name);
  console.log('db name', account.email);
  res.render('../users/edit-user',{account});
  */
  //res.send('edit user account');
});

router.put('../users/edit-user/{{avatarid}}', isAuthenticated, async(req, res)=>{
  const {name, email,id}=req.body;
  await User.findByIdAndUpdate(req.params.id,{name, email});
  req.flash('success_msg','Your Account Has Been Updated Successfully');
  res.redirect('/')
});


//**********SIGNIN */
router.get('/users/signin',(req,res)=>{                    //G
  //res.send('SignIn - render Login Form');
  res.render('./users/signin');
});

/*
router.post('/users/signin',(req,res)=>{  
  //console.log("(User signin) request body: ", req.body)//G';                            
  const {email,password}=req.body;
  const errors=[];
  if (!email){
    errors.push({text:'please enter your (emai) User Account'});
  }
  if(!password){
    errors.push({text:'Please enter a password'});
  }
  if (errors.length > 0) {
    res.render('users/signin',{
      email,
      password,
      errors
    });
  } else{
      const authorized=passport.authenticate('local',{successRedirect:'/notes', failureRedirect: 'users/signin',failureFlash:true }); 
      if(authorized){
        res.render('/notes');
      } else {
       res.render('/users/signin');
      }
      //res.send('aok NO errors... proceed Signin .. submit Login Form to server');
    }
});
*/

/* new auth*/
router.post('/users/signin', passport.authenticate('local',{
  successRedirect:'/notes',
  failureRedirect: '/users/signin',
  failureFlash:true
})); 

/* 
router.post('/users/signin',(req,res)=>{  
  console.log("(User signin) request body: ", req.body)//G';                            
  const {email,password}=req.body;
  const errors=[];
  if (!email){
    errors.push({text:'please enter your (emai) User Account'});
  }
  if(!password){
    errors.push({text:'Please enter a password'});
  }
  if (errors.length > 0) {
    res.render('users/signin',{
      email,
      password,
      errors
    });
  } else{
      res.send('aok NO errors... proceed Signin .. submit Login Form to server');
    }



});
*/

//router.post("/users/signin", signin);  


router.get('/users/logout',(req,res)=>{                        //H
  //res.send('Logout');
  //DESERIALIZE USER
  req.logout();
  req.flash("success_msg", "You are logged out now.");
  res.redirect("/");

  //res.render('Index');
});

module.exports=router;
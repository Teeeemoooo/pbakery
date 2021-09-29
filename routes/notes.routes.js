const { text } = require('express');
const { request } = require('express');
const express=require('express');
const router=express.Router();

const Note=require('../models/Note');
const {isAuthenticated}=require('../helpers/auth');
//console.log("Loged in?:",isAuthenticated);

//Routes
router.get('/notes/add', isAuthenticated,(req,res)=>{                                          
  res.render( 'notes/new-note');
});

router.post('/notes/new-note',isAuthenticated, async (req,res)=>{
  console.log("request body: ", req.body);
  const {title,description}=req.body;
  const errors=[];
    
  if(!title){
    errors.push ({text:'Please write a title'});
  }
  if(!description){
    errors.push ({text:'Please write a description'});
  }
  if (errors.length>0){
    //console.log("title:", title," description:",description);
    res.render('notes/new-note',{
      title,
      description,
      errors
    });
  } else { // WRITE NOTE IN MONGO
      const newNote = new Note({title, description}); 
      // console.log(newNote);
      newNote.userid=req.user.id;
      await newNote.save();
      req.flash('success_msg','Your Note Has Been Added Sucessfully');
      res.redirect('/notes/');
  }
  
});

router.get('/notes', isAuthenticated,async(req,res)=>{                                                         //D    res.send('notes from DB')
  const notes = await Note.find({userid:req.user.id}).lean(); //Note.find();   //.sort({date:'desc'});
  res.render('notes/all-notes', {notes});
});

router.get('/notes/update/:id', isAuthenticated, async(req,res)=>{
  //res.send ("bk point..render notes/edit-note");  
  const  nid= req.params.id; 
  console.log('nid', nid); 
  const note = await Note.findById(req.params.id).lean();
  console.log('titl',note.title); 
  console.log('desc',note.description); 
  res.render('notes/edit-note', {note});
  
});

router.put('/notes/edit-note/:id', isAuthenticated, async(req,res)=>{
  const {title, description}=req.body;
  await Note.findByIdAndUpdate(req.params.id, {title, description});
  req.flash('success_msg','Your Note Has Been Updated Sucessfully');
  res.redirect('/notes');
});

router.delete('/notes/delete/:id', isAuthenticated, async (req,res)=>{
  await Note.findByIdAndDelete(req.params.id);
  req.flash('success_msg','Your Note Has Been Deleted Sucessfully');
  res.redirect('/notes');
});

module.exports=router;


// Edit Notes F'
//router.get("/notes/edit/:id", isAuthenticated, renderEditForm);
// Edit Notes F''
//router.put("/notes/edit-note/:id", isAuthenticated, updateNote);

// Delete Notes E
//router.delete("/notes/delete/:id", isAuthenticated, deleteNote);
const express= require('express');
const router=express.Router();

router.get('/', (req,res)=>{  
  //res.send('Aqui va el archivo Index.hbs') ;      
  res.render('Index');                
});

router.get('/about', (req,res)=>{    
  res.render('About');
});

//export default router;
module.exports=router;

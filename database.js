const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/pbakery',{
      useCreateIndex:true,
      useNewUrlParser:true,
      useFindAndModify:false,
      useUnifiedTopology: true

})
  .then(db=>console.log('Mongo database connected')) // Promise
  .catch(err=>console.error(err));
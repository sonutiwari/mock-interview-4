const express = require('express');

const app = express();
const PORT = 8000 ;


app.use(express.static('./assets'));
// set up the view engine
app.set('view engine','ejs');
app.set('views','./views');

// use express router
app.use('/',require('./routes/index'));

app.listen(PORT,function(err){
    if(err){
        console.log(`Error in running server : ${err}`)
    }
    console.log(`Server is running in : ${PORT}`);
});

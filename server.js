const express = require('express');
const mainRout = require('./routers/mainRout');
const path = require('path');
const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(express.static(path.join(__dirname, 'public')));


app.use(mainRout)

app.listen(3000, (err) => {
  if(err)
  {
    console.log(err);
  } else {
    console.log("Your server is running");
  }
})
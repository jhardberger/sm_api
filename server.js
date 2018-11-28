const express		= require('express');
const app 			= express();

require ('./db/db');

//Session TK

//CORS TK

//Controllers TK

//Listener
app.listen(process.env.PORT || 9000, () => {
  console.log('listening on port 9000');
});
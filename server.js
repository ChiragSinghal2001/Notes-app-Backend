const express = require('express');
const app = express();

const mongoose = require('mongoose');
const Note = require('./src/models/note');

const bodyParser = require('body-parser');
const { $where } = require('./src/models/note');
app.use(bodyParser.urlencoded({extended: false }));
app.use(bodyParser.json());

mongoose.connect("mongodb+srv://Chiragsinghal:CS123@slantcoding.ldjfxtd.mongodb.net/?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(function(){
  mongoose.set('strictQuery', false);

  app.get("/", function(req, res) {
    const response = { statuscode: res.statusCode  , message: "API works!"};
    res.json(response);
  });

  const noteRouter = require('./src/routes/note');
  app.use("/notes" , noteRouter);

  
   const PORT = process.env.PORT || 3000;
  app.listen(PORT, function() {
    console.log("Server started at PORT: "  + PORT);
  });
}).catch(function(error) {
  console.error(error);
});
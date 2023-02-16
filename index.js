
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const _ = require("lodash");
const bodyParser = require("body-parser");
const app = express();
const path = require("path");
const dotenv = require("dotenv");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());
dotenv.config();


mongoose.connect(process.env.MONGO_URL, {
     useNewUrlParser: true});


// mongoose.set('strictQuery', false);

// mongoose.connect(process.env.MONGO_URL);



const noteSchema = {title: String, content: String};
const note = mongoose.model("note",noteSchema);

app.get("/", function (req,res){

    note.find((err,result) => {
        if(err){
            console.log(err);
        } else{
            res.json(result);

            console.log("Responded to Get Request on /");
            // console.log(result);
        }
    });
});
app.get("/getnotes", function (req,res){

    note.find((err,result) => {
        if(err){
            console.log(err);
        } else{
            res.json(result);

            console.log("Responded to Get Request on /");
            // console.log(result);
        }
    });
});

app.post("/add", function(req,res){

    const newNote = new note(req.body);
    newNote.save();

    console.log("New Note Added Successfully");
      res.redirect("/");
    // console.log(req.body);
});

app.post("/delete", function(req,res){

    const noteTitle = req.body.title;
    const noteContent = req.body.content;

    note.findOneAndDelete({title: noteTitle, content: noteContent}, (err) => {
        if(err){
            console.log(err);
        } else{
            console.log("Note Deleted Successfully");
              res.redirect("/");
            // console.log(req.body);
        }
    });
});
// if (process.env.NODE_ENV === 'production'){
// app.use(express.static(path.join(__dirname, "/client/build")));
//
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, "/client/build/index.html"));
// });
// }
let port = process.env.PORT;
if (port == null || port == "") {
  port = 4000;
}

app.listen(port, function() {
    console.log("Node Server started on port 4000");
});

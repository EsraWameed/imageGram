const Path= require ("path");
const { promises: Fs } = require('fs')
const express = require("express");
const User = require("./models/User");
const session = require('express-session');
const exphbs = require("express-handlebars")
const fileUpload = require("express-fileupload");
const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const port = process.env.PORT || 5000;
//to use fileupload. you can add upload settings in paranthesis
app.use(fileUpload())

//set up static files
app.use(express.static("public"));
//to access public folder easily from html, do upload folder
// app.use(express.static("upload"));


//to use handlebars as the view engine
const hbs = exphbs.create();

const sess = {
    secret: 'Super secret secret',
    cookie: {
          //session will expire in one hour idel time
          maxAge: 60 * 60 * 1000,
          httpOnly: true,
          secure: false,
          sameSite: 'strict',
    },
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
      db: sequelize
    })
  };

  app.use(session(sess));
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.get("/", async(req, res)=>{
    
res.render("")
})

//renders the home (index) page
app.get("/dashboard", async(req, res)=>{
    try{
        const userData = await User.findAll({
            where:{"id": 1}
        })
    
const users = userData.map((project)=> project.get({plain:true}));
// console.log(users)
res.render("index", {
    users
})} catch (err){
    res.status(500).json(err)
}


})

//want to post
app.post("/dashboard", async (req, res)=>{
   //start writing the upload functionality
//creare a variable name that will hold the file
    //keep consistent with form and call it sampleFile
    let sampleFile;
    let uploadPath;
//if object is empty send a message to alert
    if(!req.files || Object.keys(req.files).length === 0){
        return res.status(400).send("No pictures uploaded")
    }
//if not empty, grab the file
//name of the input is sampleFile. __dirname is main directory name
    sampleFile = req.files.sampleFile;

    //add code to remove. timestap function --> current# as uploadname
    uploadPath = __dirname + "/public/upload/" + sampleFile.name;
    //console log to see what object looks like
    // console.log(sampleFile);
    const userData = await User.update({profile_image:`/upload/${sampleFile.name}`},{
        where:{"id":1}});
        console.log(sampleFile.name);
    //use mv() to place file on server. grab sampleFile object and pass the path
    
    sampleFile.mv(uploadPath, function(err){
        if(err) return res.status(500).send(err);
    

//if file is rendered, display a message
app.put("/dashboard", async(req, res)=>{
    console.log("hello")
    try{
            console.log("hellooo")
 userData.map((project)=> project.get({plain:true}));
document.location.reload()} 
catch (err){
    res.status(500).json(err)
}

});
})




    // res.send("File Uploaded");
res.redirect("/dashboard");

});



sequelize.sync({force: false}).then(()=>{
    app.listen(port, ()=>console.log(`listening on port ${port}`));
})

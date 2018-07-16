var express = require('express')
var app = express()
var passport = require('passport')
var session = require('express-session')
var bodyParser = require('body-parser')
var env = require('dotenv').load()
var exphbs = require('express-handlebars')
const path = require('path');

// FOR BODY-PARSER
app.use(bodyParser.urlencoded({ extended:true}));
app.use(bodyParser.json() );


 // FOR PassPort

 app.use(session({ secret : 'b0lt0s' , reserve: true , saveUninitialized: true })); // session secret
 app.use(passport.initialize() );
 app.use(passport.session() ); // persistent login sessions



//For Handlebars
// app.set('views', './app/views')
// app.engine('hbs', exphbs({
//     extname: '.hbs'
// }));
// app.set('view engine', '.hbs');


app.get('/' , function(req,res){
    res.send();
});


// Models
var models = require("./app/models");

//Routes
var authRoute = require('./app/routes/auth.js')(app,passport);


//load passport strategies
require('./app/config/passport/passport.js')(passport, models.user);

// Sync Database
models.sequelize.sync().then(function() {

    console.log("nice ! database looks fine")
}).catch(function(err) {
        console.log(err , "somthing went wrong with database update !")
});


//server.js
// app.use(express.static(path.join(__dirname,'./client/src/index.jsx')));




app.use(express.static("client/build"));


var PORT = process.env.PORT || 3001;
app.listen(PORT , function(err){

    if (!err){
        console.log('site is live' + ' and listens to . . . ' + 'localhost:' + PORT );
    }
    else {
        console.log (err);
    }

});
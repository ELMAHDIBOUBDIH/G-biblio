var express = require('express');
var app = express();
const expressJwt = require('express-jwt');
var bodyParser = require('body-parser');
const passport = require('passport');
const passportJwt = require("./middleware/passport-jwt");

// middleware: allow cross origin end to end
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", req.get('origin'));
    //res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
    //res.header('Access-Control-Allow-Origin', 'http://localhost:8100');
    res.header('Access-Control-Allow-Credentials', true);
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,Authorization");
    next();
});
app.use(bodyParser.urlencoded({extended: true})); // support encoded bodies
app.use(bodyParser.json()); // support json encoded bodies
//app.use(expressJwt({secret: 'todo-app-super-shared-secret'}).unless({path: ['/api/login', '/api/register']}));
const Retour = require('./routes/route');
app.use(passport.initialize());
passport.use('jwt', passportJwt);
app.use('/api', Retour);


let port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server listening on port ${port}...`));
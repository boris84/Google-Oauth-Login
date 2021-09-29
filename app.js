    const express = require('express');
    const path = require('path');
    const passport = require('passport');
    const passportSetup = require('./config/passport-setup');
    // connect to db and interact with model
    const mongoose = require('mongoose');
    // used for flash messaging
    const session = require('express-session');
    const flash = require('connect-flash');
    // controls our user's session - takes cookie/encrypts it/sends it to browser
    const cookieSession = require('cookie-session');
    const expressValidator = require('express-validator');
    // sensitive info
    require('dotenv').config();
    // force https connection for http
    // const enforce = require('express-sslify');
    


    const app = express();



    // register view engine
    app.set('view engine', 'ejs');

 

   // when we deploy our application, the server most likely isn't going to run it on 5000, it's going to have the port number in an enviroment variable so we want to check that first, if  that's not available then we want to run it on port 5000. 
    const PORT = process.env.PORT || 5000;



   // force https connection for http
   // app.use(enforce.HTTPS({ trustProtoHeader: true }));



   const uri = process.env.MONGODB_URI
   
   // connect to mongodb atlas
    mongoose.connect(uri, { 
        useNewUrlParser: true, 
        useUnifiedTopology: true, 
    }).then(() => {
           app.listen(PORT, () => {
           console.log(`listening on port:${PORT}`);
           console.log('connected to mongodb');
       })
    })
               


    // set static folder
    app.use(express.static(path.join(__dirname, 'public')));



    // body parser middleware allows us to handle raw json
    app.use(express.json());
    // allows us to handle form submissions / url encoded data.
    app.use(express.urlencoded({ extended: false }));

     

    // cookie-session middleware
    app.use(cookieSession({
        maxAge: 24 * 60 * 60 * 1000,
        keys:[process.env.SESSION_COOKIE_KEY]
    }));



    // express session middleware
    app.use(session({
      secret: 'keyboard cat',
      resave: false,
      saveUninitialized: true,
      cookie: { secure: true }
    }))
     


    // express validator middleware
    app.use(expressValidator({
        errorFormatter: function(param, msg, value) {
            var namespace = param.split('.'),
            root = namespace.shift(),
            formParam = root;

            while(namespace.length) {
                formParam += '[' + namespace.shift() + ']';
            }
            return {
                param: formParam,
                msg: msg,
                value: value
            };  
        }
    }));



    // global variables for flash messages
    app.use(require('connect-flash')());
    app.use(function (req, res, next) {
        res.locals.messages = require('express-messages')(req, res);
        next();
    });
    


    // set global errors variable
    app.locals.errors = null;



   // connect Flash
    app.use(flash());



    // initialize passport
    app.use(passport.initialize());
    app.use(passport.session());



    // set up routes
    const adminRoutes = require('./routes/admin/admin_routes');
    const authRoutes = require('./routes/auth/auth_routes');
    const profileRoutes = require('./routes/profile/profile_routes');

    app.use('/admin', adminRoutes);
    app.use('/auth', authRoutes);
    app.use('/profile', profileRoutes);
    


    // GET home
    app.get('/', (req, res) => {
        res.render('home', { user: req.user });
    });



    // 404 page
    app.use((req, res) => {
      res.status(404);
      res.render('404');
    });





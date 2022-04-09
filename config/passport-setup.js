    const passport = require('passport');
    const GoogleStrategy = require('passport-google-oauth20');
    const User = require('../models/user');
    require('dotenv').config();



    // taking the user from the passport callback funtion and taking the id from the user to stuff in a cookie and sent it to browser
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });
    
    // when the browser sends the cookie back we are recieving that id and and we're finding the user in the db with that id, calling done and passing in that user. What this does is attach the user property to the req object so that we can access it a route handler
    passport.deserializeUser((id, done) => {
        User.findById(id).then((user) => {
            done(null, user);
        })
    });



    passport.use(
        new GoogleStrategy({
            // options for the google strategy
            state: true,
            callbackURL: '/auth/google/redirect',
            clientID: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET
        }, (accessToken, refreshToken, profile, done) => {
            // myEmitter.emit('changeState')
        User.findOne({googleId: profile.id}).then((currentUser) => {
            User.findOneAndUpdate({username: 'dev010_1'}, {
                username: 'admin', 
                googleId: profile.id, 
                thumbnail: profile.photos[0].value, 
                admin: 1
            }, (err, admin) => {
                if (err) {
                    throw err;
                }
            })
            if (currentUser) {
               // if user exists in db we call done and we move on the the serializeUser function
              done(null, currentUser);
               // if not, create new user in db
            } else {
                 new User({
                    username: profile.displayName,
                    googleId: profile.id,
                    thumbnail: profile.photos[0].value,
                 }).save().then((newUser)=> {
                      // moves on the the serializeUser function
                      done(null, newUser);
                 })
              }
          })
       })
    )





    
    

    
            

    
    










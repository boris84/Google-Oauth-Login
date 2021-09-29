    const passport = require('passport');
    const GoogleStrategy = require('passport-google-oauth20');
    const User = require('../models/user');
    require('dotenv').config();



    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        User.findById(id).then((user) => {
            done(null, user);
        })
    });


    passport.use(
        new GoogleStrategy({
            // options for the google strategy
            callbackURL: '/auth/google/redirect',
            clientID: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET
        }, (accessToken, refreshToken, profile, done) => {
           // check if user already exists in our database 
            User.findOne({googleId: profile.id}).then((currentUser) => {
               if (currentUser) {
                  // already have the user
                  done(null, currentUser);   
               } else {
                   
                   // if not, create new user in our db
                  new User({
                      username: profile.displayName,
                      googleId: profile.id,
                      thumbnail: profile.photos[0].value
                  }).save().then((newUser)=> {
//                      console.log('new user created:' + newUser);
                      done(null, newUser);
                  })
               }
           })
        })
    )






    
    

    
            

    
    










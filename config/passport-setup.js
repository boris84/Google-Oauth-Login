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
            
        User.findOne({googleId: profile.id}).then((currentUser) => {
            const adminId = "118286694428325198344";
                
            User.findOneAndUpdate({googleId:adminId}, {username:'Admin', googleId:profile.id, thumbnail:profile.photos[0].value, admin:1}, (err, admin) => {
                if (err) {
                    throw err;
                }
            })
            
            if (currentUser) {
               // if user exists in db
              done(null, currentUser);
               // if not, create new user in db
            } else {
                 new User({
                    username: profile.displayName,
                    googleId: profile.id,
                    thumbnail: profile.photos[0].value,
                 }).save().then((newUser)=> {
                      done(null, newUser);
                 })
              }
          })
       })
    )






    
    

    
            

    
    










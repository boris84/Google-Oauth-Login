    const passport = require('passport');
    const GoogleStrategy = require('passport-google-oauth20');
    const User = require('../models/user');
    const axios = require('axios').default;

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
           
            // to obtain more user info 'email' field 
            const token = accessToken;
            const url = `https://openidconnect.googleapis.com/v1/userinfo?access_token=${token}`;
    
            axios.get(url, {
                     method: 'GET',
                     withCredentials: true,
                     credentials: 'include',
                     headers: {
                           ContentType: 'application/json',
                           key: process.env.GOOGLE_PEOPLE_API_KEY
                     }
            })
            .then((res) => {
                 const userInfo = res;
                 // console.log(userInfo.data)
            User.findOne({googleId: profile.id}).then((currentUser) => {
                User.findOneAndUpdate({username: 'dev010_1'}, {
                    username: 'Admin', 
                    googleId: profile.id, 
                    thumbnail: profile.photos[0].value,
                    email: userInfo.data.email,
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
                        email: userInfo.data.email
                     }).save().then((newUser)=> {
                          // moves on the the serializeUser function
                          done(null, newUser);
                     })
                  }
              }).catch((errors) => {
                    console.log(errors);
               });
          })
          .catch((errors) => {
              console.log(errors)
          })  
            
   })
)





    
    

    
            

    
    










    const router = require('express').Router();
    const passport = require('passport');


    // OAUTH WITH PASSPORT ROUTES


     // auth login 
     router.get('/login', (req, res) => {
        res.render('login', { user: req.user });
     });


     // auth logout 
     router.get('/logout', (req, res) => {
        // handle with passport
        req.logout();
        req.flash('success',  'You are logged out.');
        res.session = null;
        res.redirect('/');
     });


     // auth with Google
     router.get('/google', passport.authenticate('google', {
         prompt: "select_account",
         scope: ['profile']
     }));


    // callback route for google to redirect to with code
    router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
        // res.send(req.user);
         req.flash('success',  'You are logged in.')
         res.redirect('/profile');
    });



     module.exports = router;





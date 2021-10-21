    const router = require('express').Router();
    const passport = require('passport');


    // OAUTH WITH PASSPORT ROUTES


     // auth login 
     router.get('/login', nocache, (req, res) => {
        res.render('login', { user: req.user });
        res.status(200);
     });


     // auth logout 
     router.get('/logout', (req, res) => {
        // handle with passport
        req.logout();
        req.flash('success',  'You are logged out.');
        res.status(200).redirect('/');
     });


     // auth with Google
     router.get('/google', nocache, passport.authenticate('google', {
         prompt: "select_account", 
         scope: ['profile']
     }));


    // callback route for google to redirect to with code
    router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
//         console.log(req.user);
         req.flash('success',  'You are logged in.');
         res.status(200).redirect('/profile');
    });


    // set browser no-cache headers
    function nocache(req, res, next) {
     /*post-check=0 tells the cache server not to cache the content at all. You must combine this with no-store, no-cache, must-revalidate, post-check=0, pre-check=0 to also avoid browser caching. It is commonly used for authenticated users sections and to prevent dynamic content caching*/
        res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate, post-check=0, pre-check=0');
        res.header('Expires', '-1');
        res.header('Pragma', 'no-cache');
        next();
    }

     module.exports = router;





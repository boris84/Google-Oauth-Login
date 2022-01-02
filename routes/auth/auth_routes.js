    const router = require('express').Router();
    const passport = require('passport');
    


    // OAUTH WITH PASSPORT ROUTES

     // auth login 
     router.get('/login', nocache, (req, res) => {
        res.render('login');
        res.status(200);
        res.end();
     });
 

     // auth logout 
     router.get('/logout', (req, res) => {
        // handle with passport
        req.logout();
        req.flash('success', 'You are logged out.');
        req.session = null;
        res.status(200).redirect('/');
        res.end();
     });

  
//   router.post('/google', (req, res, next) => {
//       console.log(req)
//       let stateURL = req.body.url;
//       let state = stateURL.slice(33);
//       req.url += state;
//       console.log(req.url       
//       console.log(state)
//       next() 
//   });



     // auth with Google
     router.get('/google', passport.authenticate('google', {
         prompt: "select_account", 
         scope: ['profile']
     }));



    // callback route for google to redirect to with code
    router.get('/google/redirect', function(req, res, next) {
     // Tricking the user into using the attrackers authorisation code (instead of users) by clicking some link, so that access token recieved by client is not assigned to the user's resources but attackers. There is a possibily that the response from this apps initial request is not from google, so before we exchange the code for the token we check for a state parameter value and compare it with the state parameter value that our client request initiated originally to prevent CSRF attacks
        let state = req.url.slice(23, 47);
        let nonce = req.query.state;
        console.log(state, nonce)
        if (state !== nonce) {
            req.flash('danger', 'not authorized.');
            res.status(403).redirect('/auth/login');
            res.end();
        } else {
            next();
        }  // passport takes back authorisation code in exchange for access token and when it comes back fires the passport callback function
    } , passport.authenticate('google'), (req, res) => {
        // after exhchanging authoristion code for access token, reverse the state to return a different value the next time a user logs in
         req.flash('success',  'You are logged in.');
         res.status(200).redirect('/profile');
         res.end();
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





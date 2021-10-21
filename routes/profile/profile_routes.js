    const router = require('express').Router();
    const uuid = require('uuid');


    // securing profile view
    const authCheck = (req, res, next) => {

    if(!req.user) {
        // if user is not logged in
        req.flash('danger',  'please login.');
        res.status(403).redirect('/auth/login');
    } else {
           // if user is logged in
           next();
       }
    }

    router.get('/', authCheck, nocache, (req, res) => {
       res.render('profile', { 
          user: req.user,
          admin: req.user.admin
       }); 
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









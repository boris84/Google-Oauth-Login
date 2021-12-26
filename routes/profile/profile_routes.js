    const router = require('express').Router();
    const uuid = require('uuid');
    const User = require('../../models/user');



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

    
    // profile page
    router.get('/', authCheck, nocache, (req, res) => {
       res.render('profile', { 
          user: req.user,
          admin: req.user.admin
       }); 
    });


    // get comment
    router.get('/comment/:id', authCheck, nocache, (req, res) => {
       const id = req.params.id;
        
       res.render('comment', {
          user: req.user
       }); 
    });


    // post comment
    router.post('/comment/:id', authCheck, nocache, (req, res) => {

      let id = req.params.id;
      let comment = req.body.comment;
      let user = req.user;
        
      req.checkBody('comment', "The developer appreciates your feedback.").notEmpty();

      let errors = req.validationErrors();
        
    if (errors) {
        res.render('comment', {
            user: user,
            errors: errors
        })
    } else {
        User.findOneAndUpdate({_id: id}, {
            comment: comment
        },
        {
            upsert: true,
            new: true,
       }) 
       .then((result) => {
                req.flash('success',  'Message sent !');
                res.status(200).redirect('/profile');
       })
       .catch((err) => {
            console.log(err)
        })
      }
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









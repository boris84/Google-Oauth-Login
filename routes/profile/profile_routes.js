    const router = require('express').Router();
    const uuid = require('uuid');
    const User = require('../../models/user');
    const CspHeader = require('../../public/js/csp');
    const { body, validationResult } = require('express-validator/check');




    // securing profile view
    const authCheck = (req, res, next) => {

    if(!req.user) {
        // if user is not logged in
        req.flash('danger', 'Please login.');
        res.redirect('/auth/login');
        res.end();
    } else {
        // if user is logged in
        next();
       }
    }

    
    
    
    // profile page
    router.get('/', authCheck, nocache, (req, res) => {
        
       // Content-Security-Policy Header
       res.setHeader("Content-Security-Policy", CspHeader);
        
       res.status(200).render('profile', { 
          user: req.user,
          admin: req.user.admin
       }); 
        res.end();
    });




    // get comment
    router.get('/comment/:id', authCheck, nocache, (req, res) => {
        
      // Content-Security-Policy Header
      res.setHeader("Content-Security-Policy", CspHeader);
        
      const id = req.params.id;
      res.status(200).render('comment', {
           user: req.user
      }); 
      res.end();
    });



    // post update comment
    router.post('/comment/:id', 
    [ 
       body('comment', 'Invalid input. Ilegal characters present.').not().isEmpty(),
       body('comment', 'Letters Only.').matches(/^[\.a-zA-Z,!? ]*$/).escape().trim()
    ], authCheck, nocache, 
    
    (req, res) => {
        
      // Content-Security-Policy Header
      res.setHeader("Content-Security-Policy", CspHeader);
        
      const user = req.user;
      const errors = validationResult(req);
        
      if (!errors.isEmpty()) {
            req.getValidationResult().then(result => {
                res.status(400).render('comment', { 
                    user: user,
                    errors: errors.array({ onlyFirstError: true }) 
                });
                res.end(); 
            }).catch((err) => {
                  console.log(err.message);
            })
      } else {   
            const id = req.params.id;
            const comment = req.body.comment;

            User.findOneAndUpdate({_id: id}, {
                comment: comment
            },
            {
                upsert: true,
                new: true,
           }) 
           .then(result => {
                req.flash('success',  'Message sent!');
                res.status(201).redirect('/profile');
                res.end();
           })
           .catch(err => {
                console.log(err.message);
                res.status(500);
                res.end();
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









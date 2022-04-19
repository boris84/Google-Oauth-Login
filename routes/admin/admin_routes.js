    const express = require('express');
    const router = express.Router();
    const User = require('../../models/user');
    const CspHeader = require('../../public/js/csp');
    const { body, validationResult } = require('express-validator');




    // ADMIN USERS ROUTES


    // secure admin views
    const authCheck = (req, res, next) => {
        if (!req.user) {
            // if user is not logged in and tries to access admin area 
            req.flash('danger', 'Please login.');
            res.status(400).redirect('/auth/login');
        } else if (!req.user.admin) {
             // if user is logged in and tries to access admin area
             req.flash('danger', 'Not Authorized.');
             res.status(401).redirect('/profile');
        } else {
             // if user is admin
            next();
        }
    }



    // get users 
    router.get('/users', authCheck, nocache, (req, res, next) => {
    
    // Content-Security-Policy Header
    res.setHeader("Content-Security-Policy", CspHeader);
        
    User.find().sort({createdAt: -1})
        .then(users => {
            res.status(200).render('admin-users', {
                users: users,
                admin: req.user.admin
            });
            res.end();
        })
        .catch(next);
    });




    // get user 
    router.get('/users/:id', authCheck, nocache, (req, res, next) => {
        
    // Content-Security-Policy Header
    res.setHeader("Content-Security-Policy", CspHeader);

    const id = req.params.id;
        
    User.findById(id, {useFindAndModify: false})
        .then(user => {
           res.status(200).render('admin-details', {
              user: user
           });
           res.end();
        })
        .catch(next);
    });




    // delete user
    router.delete('/users/:id', authCheck, nocache, (req, res, next) => {
        
    // Content-Security-Policy Header
    res.setHeader("Content-Security-Policy", CspHeader);
    
    const id = req.params.id;
        
    // 2. server deletes that document based on the id.
    User.findByIdAndDelete(id, {useFindAndModify: false})
        .then(result => {
       // 3. we cannot use a redirect as a response when sending an ajax request. Here the server sends json data with a 'redirect' property back to the browser as a response (go back to details.ejs ajax request).
           req.flash('success', 'User deleted!');
           res.json({redirect: '/admin/users'});
           res.end();
        })
        .catch(next)
    });




    // get edit
    router.get('/users/admin-edit-user/:id', authCheck, nocache, (req, res, next) => {
        
    // Content-Security-Policy Header
    res.setHeader("Content-Security-Policy", CspHeader);

    const id = req.params.id;  

      User.findById(id, {useFindAndModify: false})
       .then(user => {
           res.status(200).render('admin-edit-user', {
              user: user
           });
          res.end();
       })
       .catch(next);
    });




    // post edit
    router.post('/users/admin-edit-user/:id', 
    [
       body('username', 'This field must have a value.').not().isEmpty(),
       body('username', 'Letters Only.').matches(/^[\.a-zA-Z,!? ]*$/).escape().trim()
    ], authCheck, nocache, 
        
    (req, res, next) => {    
        
      // Content-Security-Policy Header
      res.setHeader("Content-Security-Policy", CspHeader);

      const id = req.params.id;
      const username = req.body.username;
      const googleId = req.body.googleId;
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
              User.findById(id, {useFindAndModify: false})
              .then(user => {
                  res.status(400).render('admin-edit-user', {
                      user: user,
                      errors: errors.array({ onlyFirstError: true }) 
                  });
                  res.end();
              }).catch((err) => {
                     console.log(err.message);
              })
       } else {
             User.findOneAndUpdate({_id: id}, {
                username: username,
                googleId: googleId,
             }, 
             {
                upsert: true,
                new: true,
             }) 
             .then(() => {
                req.flash('success',  'User updated!');
                res.status(201).redirect('/admin/users');
             })
             .catch(next);
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
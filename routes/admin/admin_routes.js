    const express = require('express');
    const router = express.Router();
    const User = require('../../models/user');



    // ADMIN USERS ROUTES


    // secure admin views
    const authCheck = (req, res, next) => {
        if (!req.user) {
            // if user is not logged in and tries to access admin area 
            req.flash('danger', 'please log in !');
            res.status(403).redirect('/auth/login');
        } else if (!req.user.admin) {
             // if user is logged in and tries to access admin area
             req.flash('danger', 'not authorized.');
             res.status(403).redirect('/profile');
        } else {
             // if user is admin
             next();
        }
    }


    // get users 
    router.get('/users', authCheck, nocache, (req, res) => {
        
    User.find().sort({createdAt: -1})
       .then((users) => {
           res.render('admin-users', {
               users: users,
               admin: req.user.admin
           });
       })
       .catch((err) => {
           console.log(err);
       })
    });



    // get user 
    router.get('/users/:id', authCheck, nocache, (req, res) => {

    const id = req.params.id;
        
    User.findById(id, {useFindAndModify: false})
       .then((user) => {
           res.render('admin-details', {
               user: user
           });
        })
       .catch((err) => {
         console.log(err);
       });
    });



    // delete user
    router.delete('/users/:id', authCheck, nocache, (req, res) => {
      const id = req.params.id;
        
      // 2. server deletes that document based on the id.
      User.findByIdAndDelete(id, {useFindAndModify: false})
       .then((result) => {
       // 3. we cannot use a redirect as a response when sending an ajax request. Here the server sends json data with a 'redirect' property back to the browser as a response (go back to details.ejs ajax request).
        req.flash('success',  'User deleted !');
        res.json({redirect: '/'});
       })
       .catch((err) => {
         console.log(err);
       })
    });



    // get edit
    router.get('/users/admin-edit-user/:id', authCheck, nocache, (req, res) => {

    const id = req.params.id;  

      User.findById(id, {useFindAndModify: false})
       .then((result) => {
         res.render('admin-edit-user', {
           user: result
         });
       })
       .catch((err) => {
         console.log(err);
       });
    });



    // post edit
    router.post('/users/admin-edit-user/:id', authCheck, nocache, (req, res) => {    
      let id = req.params.id;
      let username = req.body.username;
      let googleId = req.body.googleId;

      req.checkBody('username', 'this field must have a value !').notEmpty();
      req.checkBody('googleId', 'this field must have a value !').notEmpty();

      let errors = req.validationErrors();

      if (errors) {
         User.findById(id, {useFindAndModify: false})
            .then((user) => {
                res.render('admin-edit-user', {
                    user: user,
                    errors: errors
                });
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
              .then((result) => {
                 req.flash('success',  'User updated !');
                 res.status(200).redirect('/admin/users');
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
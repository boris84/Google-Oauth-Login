    const express = require('express');
    const router = express.Router();
    const User = require('../../models/user');



    // ADMIN USERS ROUTES


    // Securing admin views
    const authCheck = (req, res, next) => {
        if (!req.user) {
        // if user is not logged in
          req.flash('danger',  'Please log in.');
          res.redirect('/auth/login');
        } else {
          // if user is logged in
          next();
        }
    }


    // GET all users 
    router.get('/users', authCheck, (req, res) => {
        
      User.find().sort({createdAt: -1})
        .then((users) => {
          res.render('admin-users', {
            users: users,
          });
        })
        .catch((err) => {
          console.log(err);
        })
    });



    // GET a user 
    router.get('/users/:id', (req, res) => {
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



    // DELETE a user
    router.delete('/users/:id', (req, res) => {
      const id = req.params.id;
        
      // 2. server deletes that document based on the id.
      User.findByIdAndDelete(id, {useFindAndModify: false})
       .then((result) => {
       // 3. we cannot use a redirect as a response when sending an ajax request. Here the server sends json data with a 'redirect' property back to the browser as a response (go back to details.ejs ajax request).
        req.flash('success',  'User Deleted.');
        res.json({redirect: '/'});
       })
       .catch((err) => {
         console.log(err);
       })
    });



    // GET edit form
    router.get('/users/admin-edit-user/:id', (req, res) => {
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



    // handle POST edit form
    router.post('/users/admin-edit-user/:id', (req, res) => {
      const id = req.params.id;
      const user = req.user;

      req.checkBody('username', 'This field must have a value').notEmpty();
      req.checkBody('googleId', 'This field must have a value').notEmpty();

      let username = req.body.username;
      let googleId = req.body.googleId;
        
      let errors = req.validationErrors();
        
      if (errors) {
          res.render('admin-edit-user', {
              user: user,
              errors: errors,
              username: user.username,
              googleId: user.googleId,
              thumbnail: user.thumbnail
          })
      } else {
           User.findOneAndUpdate({_id: id}, {
              username: user.username,
              googleId: user.googleId,
              thumbnail: user.thumbnail
           }, 
           {
              upsert: true,
              new: true,
           }) 
             .then((result) => {
                 req.flash('success',  'User Updated.');
                 res.status(200).redirect('/admin/users');
             })
             .catch((err) => {
                 console.log(err)
             })
        }
    });
    


    module.exports = router;
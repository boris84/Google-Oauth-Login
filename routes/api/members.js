                                                    // CRUD JSON API POSTMAN

const express = require('express');
const router = express.Router();
const members = require('../../Members');
// third-party middleware for generating random universal ids
const uuid = require('uuid'); 
const logger = require('./middleware/logger');






// Get All members
// Here we have an example of a simple REST api that returns all the members of a hard-coded array (Members.js) as JSON when a user hits '/api/members'. Even though our members are javaScript objects, we don't need json.stringify() to convert them to JSON strings because json() takes care of it. 
router.get('/', (req, res) => res.json(members));





// Get a Single member 
// Here the id is a number. However, req.params.id sends it as a string, so we need to use the parseInt() function which parses a string and returns an integer.
router.get('/:id', (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id));
    
    if (found) {
        res.json(members.filter(member => member.id === parseInt(req.params.id))); 
    } else {
        res.status(400).json({ msg: `No member with the id of ${req.params.id}`});
        // The status code we want to give this particular route is 400. That means that it's a bad request. The user didn't provide the correct request information for the server to give them a correct response.
    }
});





// Create a member
router.post('/', (req, res) => {
    const newMember = {
        id: uuid.v4(),
        name: req.body.name,
        email: req.body.email,
        status: 'active'
    }
    
    if (!newMember.name || !newMember.email) {
        return res.status(400).json({ msg: 'Please include a name and email' });
        // If you don't do an else here, we're going to get an error: "headers are already sent", you can use return and that way we don't need an else.
    }
    
    members.push(newMember);
    res.json(members);
});






// Update a member
router.put('/:id', (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id));
    
    if (found) {
        const updateMember = req.body;
        members.forEach(member => {
            if (member.id === parseInt(req.params.id)) {
                member.name = updateMember.name ? updateMember.name : member.name;
                member.email = updateMember.email ? updateMember.email : member.email;
                
                res.json({ msg: 'Member updated', member });
            }
        });
    } else {
        res.status(400).json({ msg: `No member with the id of ${req.params.id}`});
    }
}); 






router.delete('/:id', (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id));
    
    if (found) {
        res.json({ 
            msg: 'Member deleted', 
            members: members.filter(member => member.id !== parseInt(req.params.id))
        }); 
    } else {
        res.status(400).json({ msg: `No member with the id of ${req.params.id}`});
    }
}); 





module.exports = router;











 // POSTMAN CLIENT + BROWSER  app.js 


   //  Init middleware
    app.use(logger);


     // Serve a static files
     app.get('/', (req, res) => {
       res.send('<h1>Hello World</h1>');
       res.sendFile(path.join(__dirname, 'public', 'index.html'));
    });


    // Members API routes
    app.use('/api/members', require('./routes/api/members'));




/* When we do a successful res.send or res.json the status code is automaitcally set to 200 but we can use conditionals to create different statuses based on a condition. The POST route below requires a user to input a name. If there is no name we want to return a 400 response which means it's a 'Bad Request', if a name is included we send back a 201 response which means everything is 'ok' and something was 'created'. */
    app.get('/contact', (req, res) => {
       const name = req.body.name;
        
       if (!req.body.name) {
          return res.status(400).send('Name is required');   
        }
        
          res.status(201).send(`Thank you ${name}`);
        // DATABASE STUFF
        // res.status(201).send(`Thank you ${req.body.name}`);
        // note: you dont need return if its the only or the last repsonse in a route.
    });
    
    
    
    
    // Header Values
    // A lot of times when your dealing with fullstack applications, you use Tokens or json web tokens for authentication. You can either send this in the authorization but it is preffered to send it in a value called 'x-auth-token'. Below is an example of how you can authenticate through tokens in the headers.
    app.post('/login', (req, res) => {
        
        // check for a token in the header
        if (!req.header('x-auth-token')) {
            return res.status(400).send('No Token');
        }   
        // pretend validation
        if (req.header('x-auth-token') !== '123456') {
            return res.status(401).send('Not Authorised');
        }
        
        res.send('Logged In');
    });
    
    // Header Values / Fields
    // req.header('host'); returns localhost
    // req.header('user-agent'); returns client / utility 
    // res.send(req.rawHeaders); returns an array all headers
    
    
    

    // post
    app.put('/post/:id', (req, res) => {
        // DATABASE STUFF
        
        /* typically you would do an 
        update of the database using 
        the :id here */
        
        res.json({
            id: req.params.id,
            // req.params will access the url values.
            title: req.body.title
            // req.body will access the form or json data that you send in the body.
        });
    });
    
    

    
    // Delete is basically the same as post. Include the id, delete it in the database but you most likely wont return the post because it has been deleted so you might do something like create a msg (using the :id) that notifies the users that the post with that specified id was deleted successfully.
    app.delete('/post/:id', (req, res) => {
        // DATABASE STUFF
        
        /* typically you would do an 
        update of the database using 
        the :id here */
        
        res.json({ msg: `Post ${req.params.id} deleted`});
    
    });









     // Using a variable to select the keys of an object

    let day = 'Saturday';
    let alarm;
    
    const person = {
        name: 'Simon',
        age: 40,
        weekendAlarm: 'No alarms needed',
        weekAlarm: 'Alarm set to 7AM'
    }
    
    if (day == 'Saturday' || day == 'Sunday') {
        alarm = 'weekendAlarm';
    } else {
        alarm = 'weekAlarm';
    }
    
    console.log(person[alarm]);











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











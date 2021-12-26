    const bcrypt = require('bcryptjs'); 
    require('dotenv').config();

    // random state parameter value to help prevent against XSS attacks
    const stateURI = bcrypt.hashSync(process.env.STATE_URI, 8);
    module.exports = stateURI;










    
      

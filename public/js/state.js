    // Generate a unique random state parameter value using crypto
    let Crypto = require('crypto')

    function createString(size = 21) {  
        return Crypto.randomBytes(size).toString('base64').slice(0, size)
    }
    
    let state = createString();
    module.exports = state;



    
      

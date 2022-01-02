    // Generate a unique random state parameter value using base64url
//    const bcrypt = require('bcryptjs');
//    const base64url = require('base64url');
//    const secret = process.env.SESSION_COOKIE_KEY;
//
//
//    function genUniqueString(length) {
//
////     let characters = base64url(secret);
//        let characters = secret;
//        let uniqueString = new Array();
//        
//        for (let i = 0; i < length; i++) {
//                let index = Math.floor(Math.random() * characters.length);
//                uniqueString.push(characters.charAt(index));
//             }
//                uniqueString = base64url(uniqueString.join(""));
//                return uniqueString;
//    }
//
//    module.exports = genUniqueString;











    




//    const googleButton = document.querySelector('a.google-btn');
//    googleButton.addEventListener('click', setState);
//
//
//    function setState() {
//       let state = 'abcd1234'
//       let state_serialized = JSON.stringify(state);
//       localStorage.setItem('state', state_serialized);
//       let url = new URL(`${googleButton.href}?state=${state}`);
//       getState(url, state_serialized);
//    }
//    
//    
//    function getState(url, state_serialized) {
//        const xhr = new XMLHttpRequest();
//        xhr.open('POST', '/auth/google', true);
//        xhr.setRequestHeader('Content-Type', 'application/json');
//        
//        xhr.onload = function(url) {
//           if (this.status === 200) {
//              url = this.responseText;
//             // let url = googleButton.href +=`?state=${state_seialized}`;
//           }
//        }
//        xhr.send(JSON.stringify({url: url}));
//    }
//    
//    let state_deserialized = JSON.parse(localStorage.getItem('state'));
//    localStorage.removeItem('state'); 
      

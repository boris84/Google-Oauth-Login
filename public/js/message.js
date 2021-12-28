// FLASH MESSAGES AND ERRORS FOR TEMPLATES
const message = document.querySelector('.message');
    

// message
if (message) {
    setTimeout(() => {
        message.style.display = 'none'
    }, 2000);
}


// errors
const errors = document.querySelector('.errors');
    
if (errors) {
    setTimeout(() => {
        errors.style.display = 'none'
    }, 2000);
}



















/* 
let admin = ({
  name: '_admin',
  key: '%2C.%22.%5EyG%27-%2B%230%60a~_%5Dt%2C%21%3F%7Dh.%2C%60%2C%60%5C%26%C2%A3%24%7B%29%2C%C2%A3z-%60.%2C.'
});
    
let admin_serialized = JSON.stringify(admin);
localStorage.setItem('admin', admin_serialized);
let admin_deserialized = JSON.parse(localStorage.getItem('admin'));

    
const adminButton = document.getElementById('admin');
    
if (admin_deserialized.name === '_admin' && admin_deserialized.key === '%2C.%22.%5EyG%27-%2B%230%60a~_%5Dt%2C%21%3F%7Dh.%2C%60%2C%60%5C%26%C2%A3%24%7B%29%2C%C2%A3z-%60.%2C.') {
        
    adminButton.style.display = 'block';
} else {
    adminButton.style.display = 'none';
    localStorage.removeItem('admin');
}
    
function signOut() {
   localStorage.removeItem('admin');
}
*/ 
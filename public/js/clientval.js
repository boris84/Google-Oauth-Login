// COMMENT CLIENT-SIDE VALIDATION
const form = document.getElementById('form');
const textarea = document.getElementById('textarea');
const errorElement = document.getElementById('small');


form.addEventListener('submit', (e) => {
    let messages = [];
    
    if (textarea.value.includes('<') || textarea.value.includes('>') || textarea.value.includes('<script>') || textarea.value.includes('</script>') || textarea.value.includes('alert()') || textarea.value.includes('src') || textarea.value.includes('img')) {
       messages.push("Invalid input. Please enter a message.");
       
        if (messages.length > 0) {
            e.preventDefault();
            errorElement.style.visibility = 'visible';
            errorElement.innerText = messages;
        }
     }
    
})
    
  
    
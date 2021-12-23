// COMMENT CLIENT-SIDE VALIDATION
const form = document.getElementById('form');
const textarea = document.getElementById('textarea');
const checkCircle = document.querySelector('.fa-check-circle');
const exclamationCircle = document.querySelector('.fa-exclamation-circle');
const errorElement = document.getElementsByTagName('small');


form.addEventListener('submit', (e) => {
    
    let textareaTrimmed = textarea.value.trim();
    let messages = [];
    
    
    // if valid input
    if (textareaTrimmed) {
        textarea.style.borderColor = '#00f300';
        checkCircle.style.visibility = 'visible';
        errorElement[0].style.visibility = 'visible';
        errorElement[0].style.color = '#00f300';
              
        errorElement[0].innerText = "Success, thank you.";
          
        setTimeout(() => {
            textarea.style.borderColor = '#ced4da';
            checkCircle.style.visibility = 'hidden';
            errorElement[0].style.visibility = 'hidden';
        }, 1000);
    }
    
    
    // check input for possible malicious code
    if (textareaTrimmed.includes('<') || textareaTrimmed.includes('>') || textareaTrimmed.includes('<script>') || textareaTrimmed.includes('</script>') || textareaTrimmed.includes('alert()') || textareaTrimmed.includes('src') || textareaTrimmed.includes('img')) {
        
        e.preventDefault();
        textarea.style.borderColor = '#f41414';
        exclamationCircle.style.visibility = 'visible';
        checkCircle.style.visibility = 'hidden';

        errorElement[0].style.visibility = 'visible';
        errorElement[0].style.color = '#f41414';
        
        errorElement[0].innerText = "Invalid input. Please enter a message.";
         
        setTimeout(() => {
            textarea.style.borderColor = '#ced4da';
            exclamationCircle.style.visibility = 'hidden';
            errorElement[0].style.visibility = 'hidden';
        }, 1000);
     }
      
    
    // if no input
    if (!textareaTrimmed) {
        textarea.style.borderColor = '#f41414';
        exclamationCircle.style.visibility = 'visible';
        errorElement[0].style.visibility = 'visible';
        
        errorElement[0].innerText = "Please enter a message.";
         
        setTimeout(() => {
            textarea.style.borderColor = '#ced4da';
            exclamationCircle.style.visibility = 'hidden';
            errorElement[0].style.visibility = 'hidden';
        }, 1000);
     }
    
})
    
                    
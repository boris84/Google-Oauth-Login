// COMMENT CLIENT-SIDE VALIDATION
const form = document.getElementById('form');
const textArea = document.getElementById('textarea');
const checkCircle = document.querySelector('.fa-check-circle');
const exclamationCircle = document.querySelector('.fa-exclamation-circle');


function sanitizeInput(input) {
    return DOMPurify.sanitize(input, {ALLOW_DATA_ATTR: false}, {USE_PROFILES: {html: true}}, {FORBID_TAGS: ['style']}, {FORBID_ATTR: ['style']});
}

// Example starter JavaScript for disabling form submissions if there are invalid fields
(function () {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  var forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.prototype.slice.call(forms)
    .forEach(function (form) {
      form.addEventListener('submit', function (event) {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }
          textArea.value = sanitizeInput(textArea.value)
          form.classList.add('was-validated')

        form.classList.add('was-validated')
      }, false)
    })
})()



                              

        

        
        
        
      
    










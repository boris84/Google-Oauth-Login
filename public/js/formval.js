// COMMENT CLIENT-SIDE VALIDATION
const form = document.getElementById('form');
const textarea = document.getElementById('textarea');
const checkCircle = document.querySelector('.fa-check-circle');
const exclamationCircle = document.querySelector('.fa-exclamation-circle');


// Example starter JavaScript for disabling form submissions if there are invalid fields
(function () {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  var forms = document.querySelectorAll('.needs-validation');

  // Loop over them and prevent submission
  Array.prototype.slice.call(forms)
    .forEach(function (form) {
      form.addEventListener('submit', function (event) {
        if (!form.checkValidity()) { 
          event.preventDefault();
          event.stopPropagation();
        } 

        form.classList.add('was-validated');
      }, false)
    })
})()



                    
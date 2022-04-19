    const changeDate = function(date) {
        return date = new Date().toLocaleDateString('en-GB');
    }

    const updatedDate = changeDate(document.querySelector('.date'))
    const date = document.querySelector('.date');

    date.innerHTML = updatedDate;

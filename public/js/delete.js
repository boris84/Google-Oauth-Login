// ADMIN-DETAILS DELETE METHOD USING FETCH
  const deleteButton = document.querySelector('a.delete');

    deleteButton.addEventListener('click', () => {
    const endpoint = `/admin/users/${deleteButton.dataset.doc}`;

  // AJAX Request
    fetch(endpoint, {
      method: 'DELETE'
    })
    // 4. we get that json data back as json which we can't readily use so we take that json response we use response.json on it, what this does is it returns another promise whereby it parses the json data into a javascript object which we can use. 
    .then((response) => response.json())
    // 5. so we tack on another then method where we get access to that actual javascript object. The only thing left to do now is to redirect on the front-end. We redirect from the front-end by taking the window object's location href and set it equal to our data we get back from the server's property which is 'redirect'.
    .then((data) => window.location.href = data.redirect)
    .catch((err) => console.log(err))
  });




const csp = "default-src 'self' https:; script-src 'self' https://kit.fontawesome.com https://cdn.jsdelivr.net 'unsafe-inline'; style-src 'self' https://cdn.jsdelivr.net https://fonts.googleapis.com 'unsafe-inline'; img-src 'self' data: https://fonts.googleapis.com https://lh3.googleusercontent.com; font-src 'self' https://ka-f.fontawesome.com https://fonts.gstatic.com; connect-src 'self' https://ka-f.fontawesome.com; media-src 'self'; object-src 'self'; frame-src 'self'; report-uri http://localhost:5000";


module.exports = csp;
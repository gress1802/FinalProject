authenticatedUser = null;

/*
 * This is a function that is envoked when the user click the login button
 * It will get the username and password from the form and send it to the server to authenticate the user
 * The server will either respond with a 401 error or a 200 ok with the user object
*/
function login() {
    let emailInput = $('#defaultForm-email').val();
    let passwordInput = $('#defaultForm-pass').val();
    let bodyData = JSON.stringify({ email: emailInput, password: passwordInput });
    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: bodyData
    }).then(res => {
        if(res.ok) {
            return res.json();
        }else if (res.status == 401){
            throw new Error('Invalid credentials');
        }else{
            throw new Error('Server error ' + res.status);
        }
    }).then(user => {
        authenticatedUser = user;
        $('#loginError').text('Valid Credentials');
        $('#modalLoginForm').modal('hide');
        //do more in here with javascript
    }).catch(err => {
        console.log('error');
        $('#loginError').text('Invalid credentials');
        $('loginError').css('color', 'red');
    })
}


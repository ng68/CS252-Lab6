var username = document.getElementById("email");
var password = document.getElementById("password");
var SignInbtn = document.getElementById("SignInbtn");
var SignUpbtn = document.getElementById("SignUpbtn");
const auth = firebase.auth();

SignInbtn.addEventListener('click', e => {
    const user = username.value;
    const pass = password.value;
    
    const promise = auth.signInWithEmailAndPassword(user,pass).catch(function(error){
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode === 'auth/wrong-password') {
            alert('Wrong password.');
        }
        if (errorCode === 'auth/user-not-found') {
            alert('User Not Found.');
        }
        if(errorCode === 'auth/invalid-email') {
            alert('Invalid Email');
        }
        else {
            alert(errorMessage);
        }
    });
});

SignUpbtn.addEventListener('click', e=> {
    window.location.href = "signup.html";
});

auth.onAuthStateChanged(function(user) {
    if(user){
        console.log('Signed In');
        window.location.href = "main.html";
    }
});






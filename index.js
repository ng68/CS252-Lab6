var username = document.getElementById("email");
var password = document.getElementById("password");

function signUpClick() {
    window.location.href = "signup.html";
}

function signInClick() {
    window.alert(username.value);
    window.alert(password.value);
    window.alert("Hello");
}




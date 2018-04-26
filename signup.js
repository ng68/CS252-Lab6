var submitBtn = document.getElementById("submit");
var username = document.getElementById("email");
var password = document.getElementById("password");

submitBtn.addEventListener('click', e=> {
    const user = username.value;
    const pass = password.value;
    const auth = firebase.auth();
    const promise = auth.createUserWithEmailAndPassword(user,pass).catch(function(error){
        var errorCode = error.code;
        var errorMessage = error.message;
        if(errorCode === 'auth/invalid-email'){
            alert('Invalid Email');
        }
        else {
            alert(errorMessage);
        }
    });
});
firebase.auth().onAuthStateChanged(firebaseUser => {
        if(firebaseUser){
            console.log('Success!');
            var edited = firebaseUser.email;
            edited = edited.substr(0,edited.indexOf('.'));
            alert("Users/" + edited);
            firebase.database().ref("Users/" + edited).set("none");
            window.location.href = "index.html";
        }
        else {
            console.log('User not created');
        }
    });

    
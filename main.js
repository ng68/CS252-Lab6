document.getElementsByClassName('tablinks')[0].click();
var build = document.getElementById("clas");
var time = document.getElementById("adder");
var ap = document.getElementById("tod");
var classroom = document.getElementById("classroom");
var hello = 0;

function openCity(evt, cityName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
}

function initMap() {
    var purdue = {lat: 40.4237, lng: -86.9212};
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 15,
      center: purdue
    });
    var marker = new google.maps.Marker({
      position: purdue,
      map: map
    });
  }

  var logoutBtn = document.getElementById("log");
  logoutBtn.addEventListener('click', e=> {
    const promise = firebase.auth().signOut().catch(function(error) {
        alert('Logout Unsuccessful');
    });
    window.location.href = "index.html";
  });
    
  // HOW TO RETRIEVE FROM FIREBASE
  var ref = firebase.database().ref().child("Buildings");
  var options = "";
  
  ref.on("child_added", snapshot => {
  options = "<option>" + snapshot.child("Name").val() + "</option>";
  document.getElementById("clas").innerHTML += options;
  });

  // HOW TO PUT IN TO FIREBASE
  function addButton() {
    
    // var fireRef = firebase.database().ref("Users/newUser/Class");
    
    // fireRef.child("AMPM").set(ap.value);
    // fireRef.child("Classroom").set(classroom.value);
    // fireRef.child("Name").set(build.value);
    // fireRef.child("Time").set(time.value);

    //HOW TO REMOVE CLASS FROM LIST
    //var rref = firebase.database().ref("Users").child("username");
    //rref.on("child_added", snapshot => {
    //var temp = snapshot.child("AMPM").val();
    //alert(temp);
    //if (temp === "PM") {
    //  snapshot.ref.remove();
    //}
  //});
    
    //HOW TO ADD CLASS
    //firebase.database().ref("Users").child("Hello").push({"hello": "hi", "no": "yes", "dkd": "fkf"});
  }
  

  
  
  


document.getElementsByClassName('tablinks')[0].click();
var build = document.getElementById("clas");
var time = document.getElementById("adder");
var ap = document.getElementById("tod");
var classroom = document.getElementById("classroom");
var remover = document.getElementById("rem");
refresh();

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
    var ref5 = firebase.database().ref("Users").child("colecompton28@gmail");
    ref5.on("child_added", snapshot5 => {
      var Name = snapshot5.child("Name").val();
      var Classroom = snapshot5.child("Classroom").val();
      var Time = snapshot5.child("Time").val();
      var AMPM = snapshot5.child("AMPM").val();
      var ref6 = firebase.database().ref("Buildings").child(Name);
      ref6.on("value", function(snapshot6){
        var Lon = snapshot6.child("Lat").val();
        var Lat = snapshot6.child("Lon").val();
        var upd = {lat: Lat, lng: Lon};
        var marker = new google.maps.Marker({
          position: upd,
          map: map
        });
      });
    });
  }

  var logoutBtn = document.getElementById("log");
  logoutBtn.addEventListener('click', e=> {
    const promise = firebase.auth().signOut().catch(function(error) {
        alert('Logout Unsuccessful');
    });
    window.location.href = "index.html";
  });
    
  // ADD CLASS DROP DOWN LIST
  var ref = firebase.database().ref().child("Buildings");
  var options = "";
  ref.on("child_added", snapshot => {
  options = "<option>" + snapshot.child("Name").val() + "</option>";
  document.getElementById("clas").innerHTML += options;
  }); 

  // HOW TO PUT IN TO FIREBASE
  function addButton() {
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) { 
        var usernam = user.email.substr(0,user.email.indexOf("."));
        firebase.database().ref("Users").child(usernam).push( {
          "AMPM": ap.value, 
          "Classroom": classroom.value, 
          "Name": build.value,
          "Time": time.value
      });
      refresh();
      } else {
        window.location.href = "index.html";
      }
    });
  }

  function refresh() {
   firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      var usernam2 = user.email.substr(0,user.email.indexOf("."));
      firebase.database().ref("Users").child(usernam2).on("value", function(snapshot2){
        if(snapshot2.val() === "none") {
          document.getElementById("lis").innerHTML = "<p><i>Classes cleared.</i></p>";
        }else {
          //REFRESHES CLASS LIST AND DROP DOWN LIST AND MAP
          var ref1 = firebase.database().ref("Users").child(usernam2);
          var options1 = "";
          var options3 = "";
          document.getElementById("lis").innerHTML = "";
          document.getElementById("rem").innerHTML = "";
          ref1.on("child_added", snapshot1 => {
            options1 = "<option>" + snapshot1.child("Name").val() + " " + snapshot1.child("Classroom").val() + " " + snapshot1.child("Time").val() + snapshot1.child("AMPM").val() + "</option>";
            document.getElementById("rem").innerHTML += options1;
            options3 = "<p>" + snapshot1.child("Name").val() + " " + snapshot1.child("Classroom").val() + " " + snapshot1.child("Time").val() + snapshot1.child("AMPM").val() + "</p>";
            document.getElementById("lis").innerHTML += options3;
          });
        }
      });
    } else {
      window.location.href = "index.html";
    }
  });


  }

  function removeButton() {
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) { 
        var usernam4 = user.email.substr(0,user.email.indexOf("."));
        var rref = firebase.database().ref("Users").child(usernam4);
        var workable = remover.value;
        //Building
        var temp1 = workable.substr(0, workable.indexOf(" "));
        workable = workable.substr(workable.indexOf(" ")+1);
        //AMPM
        var temp4 = workable.substr((workable.length)-2, workable.length);
        workable = workable.substr(0, (workable.length)-2);
        //Classroom
        var temp2 = workable.substr(0, workable.indexOf(" "));
        //Time
        var temp3 = workable.substr(workable.indexOf(" ")+1);
        
        rref.on("child_added", snapshot => {
        var tempA = snapshot.child("AMPM").val();
        var tempB = snapshot.child("Name").val();
        var tempC = snapshot.child("Classroom").val();
        var tempD = snapshot.child("Time").val();
        
        if (tempA == temp4 && tempB == temp1 && tempC == temp2 && tempD == temp3) {
           snapshot.ref.remove();
        }
      }); 
        refresh();
      } else {
        window.location.href = "index.html";
      }
    }); 
  }

  function clearButton() {
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) { 
        var usernam1 = user.email.substr(0,user.email.indexOf("."));
        firebase.database().ref("Users").child(usernam1).set("none");
        refresh();
      } else {
        window.location.href = "index.html";
      }
    });
  }
  

  
  
  


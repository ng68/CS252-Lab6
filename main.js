document.getElementsByClassName('tablinks')[0].click();

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
  

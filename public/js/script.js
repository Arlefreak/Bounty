/*jshint unused:false*/
var map;
var google = window.google;
var bellasArtes = {lat: 19.4354573, lng: -99.1416958 };

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: bellasArtes,
    zoom: 14
  });

  var marker = new google.maps.Marker({
    position: bellasArtes,
    map: map,
    title: 'Bellas Artes'
  });

  var infoWindow = new google.maps.InfoWindow({map: map});
  // Try HTML5 geolocation.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      infoWindow.setPosition(pos);
      infoWindow.setContent("You'r here!");
      map.setCenter(pos);
    }, function() {
      handleLocationError(true, infoWindow, map.getCenter());
    });
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
                        'Error: The Geolocation service failed.' :
                          'Error: Your browser doesn\'t support geolocation.');
}

var $ = window.$;
var WINNER = '';

function HandleData( data ) {
  console.table(data);
  var rnmb = Math.floor((Math.random() * 1000) + 1);
  document.getElementById("winnerImg").src = "http://api.superbountyhunterx.com/" + data.avatar_url;
  document.getElementById("winnerName").innerHTML = WINNER;
  document.getElementById("winnerMoney").innerHTML = rnmb;
}

$("input").on("keydown",function search(e) {
  if(e.keyCode === 13) {
    var v = $(this).val();
    WINNER = v;
    var url = 'http://104.131.78.147/api/avatars';
    var data = { "nickname": v};
    $.ajax({
      type: "POST",
      url: url,
      data: data,
      success: HandleData
      // dataType: dataType
    });
  }
});


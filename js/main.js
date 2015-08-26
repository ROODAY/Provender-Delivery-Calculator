var keys = {37: 1, 38: 1, 39: 1, 40: 1, 32: 1, 33: 1, 34: 1, 35: 1, 36: 1};

function preventDefault(e) {
  e = e || window.event;
  if (e.preventDefault)
      e.preventDefault();
  e.returnValue = false;  
}

function preventDefaultForScrollKeys(e) {
    if (keys[e.keyCode]) {
        preventDefault(e);
        return false;
    }
}

function disableScroll() {
  if (window.addEventListener) // older FF
      window.addEventListener('DOMMouseScroll', preventDefault, false);
  window.onwheel = preventDefault; // modern standard
  window.onmousewheel = document.onmousewheel = preventDefault; // older browsers, IE
  window.ontouchmove  = preventDefault; // mobile
  document.onkeydown  = preventDefaultForScrollKeys;
}

function enableScroll() {
    if (window.removeEventListener)
        window.removeEventListener('DOMMouseScroll', preventDefault, false);
    window.onmousewheel = document.onmousewheel = null; 
    window.onwheel = null; 
    window.ontouchmove = null;  
    document.onkeydown = null;  
}

disableScroll();

$(document).ready(function(){
  var directionsDisplay, directionsService;
  var pages = $('#pages-container').children();
  var currentPage = 0;
  $("#google-map").css("height", $("#driving-stats").height() + "px");
  var map = document.querySelector('google-map');
  map.latitude = 37.77493;
  map.longitude = -122.41942;
  map.addEventListener('google-map-ready', function(e) {
    directionsService = new google.maps.DirectionsService();
    setTimeout(function(){
    $("#loading").css("margin-top", "-100vh");
    }, 300);
    enableScroll();
  });

  function initialize() {
    directionsDisplay = new google.maps.DirectionsRenderer();
    var chicago = new google.maps.LatLng(41.850033, -87.6500523);
    var mapOptions = {
      zoom:7,
      center: chicago
    };
    map = new google.maps.Map(document.getElementById("google-map"), mapOptions);
    directionsDisplay.setMap(map);
  }

  $(".mdl-button").click(function(e){
    e.preventDefault();
  });

  $("#prevPage").click(function(){
    $(pages[currentPage]).removeClass('iron-selected');
    if (currentPage - 1 >= 0) {
      currentPage -= 1;
    } else {
      currentPage = pages.length - 1;
    }
    $(pages[currentPage]).addClass('iron-selected');
    if (currentPage === 0) {
      $("#prevPage").css("display", "none");
    } else {
      $("#prevPage").css("display", "inline-block");
    }
    if (currentPage === 5) {
      $("#nextPage>paper-material").html("Restart <iron-icon icon=\"chevron-right\"></iron-icon>");
      $("#nextPage").addClass("reset");
    } else {
      $("#nextPage>paper-material").html("Next <iron-icon icon=\"chevron-right\"></iron-icon>");
    }
  });
  $("#nextPage").click(function(){
    $(pages[currentPage]).removeClass('iron-selected');
    if (currentPage + 1 < pages.length) {
      currentPage += 1;
    } else {
      currentPage = 0;
    }
    $(pages[currentPage]).addClass('iron-selected');
    if (currentPage === 0) {
      $("#prevPage").css("display", "none");
    } else {
      $("#prevPage").css("display", "inline-block");
    }
    if (currentPage === 5) {
      $("#nextPage>paper-material").html("Restart <iron-icon icon=\"chevron-right\"></iron-icon>");
    } else {
      $("#nextPage>paper-material").html("Next <iron-icon icon=\"chevron-right\"></iron-icon>");
    }
  });

  function checkReset() {
    if (currentPage === 5) {
      $(".form-input").val("");
    }
  }

  Polymer.addEventListener(document.getElementById('nextPage'), 'tap', checkReset);
});


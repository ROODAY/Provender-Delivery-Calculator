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
});

var destinationCount = 2,
    taskCount = 4,
    workerCount = 3,
    expenseCount = 3;
appendExpense = function() {
  $("#expenses-inputs-container").append("<form-input info='{\"label\": \"Expense-" + expenseCount + "\"}'></form-input>");
  expenseCount += 1;
};
appendWorker = function() {
  $("#labor-inputs-container").append("<form-input info='{\"label\": \"Worker-" + workerCount + "\"}'></form-input>");
  workerCount += 1;
};
appendTask = function() {
  $("#tasks-inputs-container").append("<form-input info='{\"label\": \"Task-" + taskCount + "\"}'></form-input>");
  taskCount += 1;
};
appendDestination = function() {
  $("#driving-stats-inputs-container").append("<form-input info='{\"label\": \"Destination-" + destinationCount + "\"}'></form-input>");
  destinationCount += 1;
  $("#google-map").css("height", $("#driving-stats").height() + "px");
};

runCalculations = function() {
  calcDrivingStats();
  calcDepreciation();
};

calcDepreciation = function() {
  var amount = parseInt($("#input-loan-amount").val()),
      term = parseInt($("#input-term-of-loan-in-years").val()),
      rate = parseInt($("#input-annual-interest-rate").val()),
      periods = parseInt($("#input-payments-per-year").val());

  return  {
    ratePerPeriod: Math.round(((1 + (rate/100)/periods) - 1) * 10000) / 10000,
    paymentPerPeriod: Math.round(((ratePerPeriod * amount) / (1 - (Math.pow((1 + ratePerPeriod), -1 * periods * term)))) * 100) / 100,
    numPayments: Math.round(NPER(ratePerPeriod, paymentPerPeriod, -1 * amount)),
    totalPayment: Math.round((paymentPerPeriod * numPayments) * 100) / 100,
    totalInterest: Math.round((totalPayment - amount) * 100) / 100
  };
    
};

function NPER(rate, payment, present) {
  var type = 0;
  var future = 0;
  var num = payment * (1 + rate * type) - future * rate;
  var den = (present * rate + payment * (1 + rate * type));
  return Math.log(num / den) / Math.log(1 + rate);
}

calcTaskTime = function() {
  tasks = $("#tasks-inputs-container").find("input");
  totalTime = 0;
  for (var i = 0; i < tasks.length; i++) {
    totalTime += parseInt($(tasks[i]).val());
  }
  return totalTime;
};

calcLaborCosts = function(hours) {
  wages = $("#labor-inputs-container").find("input");
  totalLaborCost = 0;
  for (var i = 0; i < wages.length; i++) {
    totalLaborCost += parseInt($(wages[i]).val()) * hours;
  }
  return totalLaborCost;
};

calcDrivingStats = function() {
  var obj = $("#driving-stats-inputs-container").find("input");
  var locations = [];
  for (var i = 1; i < obj.length; i++) {
    input = obj[i];
    point = {
      location: $(input).val(),
      stopover: false
    };
    locations.push(point);
  }
  var req = {
    origin: $(obj[0]).val(),
    destination: $(obj[0]).val(),
    waypoints: locations,
    provideRouteAlternatives: false,
    travelMode: google.maps.TravelMode.DRIVING,
    unitSystem: google.maps.UnitSystem.IMPERIAL
  };
  metrics = [];
  directionsService.route(req, function(res){
    metrics.push(res.routes[0].legs[0].distance);
    metrics.push(res.routes[0].legs[0].duration);
    console.log(metrics);
  });
};
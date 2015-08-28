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
var directionsDisplay, directionsService, map, graph;
$(document).ready(function(){
  var pages = $('#pages-container').children();
  var currentPage = 0;
  graph = document.querySelector('google-chart');
  map = document.querySelector('google-map');
  map.latitude = 37.77493;
  map.longitude = -122.41942;
  map.addEventListener('google-map-ready', function(e) {
    directionsService = new google.maps.DirectionsService();
    directionsDisplay = new google.maps.DirectionsRenderer();
    enableScroll();
    setTimeout(function(){
      $("#loading").css("margin-top", "-100vh");
    }, 300);
  });

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
      calcDrivingStats();
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
};

runCalculations = function(res) {
  var metrics = [];
  metrics.push(res.routes[0].legs[0].distance);
  metrics.push(res.routes[0].legs[0].duration);
  var calcs =  {
    drivingStats: metrics,
    financialMetrics: calcDepreciation(),
    taskTime: calcTaskTime(),
    laborCost: calcLaborCosts(calcTaskTime()),
    fuelCost: Math.round((calcFuelCost(metrics[0].value / 1609.34)) * 100) / 100,
    misc: calcMisc(calcDepreciation())
  };
  var totalTime = (Math.round((calcs.taskTime + (calcs.drivingStats[1].value / 60 / 60)) * 10) / 10);
  var costOfDistribution = Math.round((calcs.laborCost + calcs.fuelCost + calcs.misc.totalExpenses) * 100) / 100;
  var breakEven = Math.round((costOfDistribution / (parseInt($("#input-profit-margin").val()) / 100)) * 100) / 100;
  $("#driving-stats").html("Your trip would cover about <b>" + calcs.drivingStats[0].text + "les</b> and take about <b>" + calcs.drivingStats[1].text + "</b>.");
  var sittingTime = Math.round(((calcs.drivingStats[1].value / 60 / 60) / totalTime) * 100);
  $("#time-spent").html("You would spend a total of <b>" + totalTime + " hours</b>. <b>" + sittingTime + "%</b> sitting and <b>" + (100 - sittingTime) + "%</b> standing.");
  $("#costs").html("It would cost <b>$" + costOfDistribution + "</b>, <b>$" + (Math.round(calcs.laborCost * 100) / 100) + "</b> on labor, <b>$" + (Math.round(calcs.fuelCost * 100) / 100) + "</b> on fuel, and <b>$" + (Math.round(calcs.misc.totalExpenses * 100) / 100) + "</b> on other expenses.");
  $("#break-even").html("You would need to sell <b>$" + breakEven + "</b> to break even.");
  map = new google.maps.Map(document.getElementById("google-map"));
  directionsDisplay.setMap(map);
  directionsDisplay.setDirections(res);
  loadGraph(calcs);
};

loadGraph = function(calcs) {
  data = {
    "cols": [
          {"id":"","label":"Type","pattern":"","type":"string"},
          {"id":"","label":"Cost","pattern":"","type":"number"}
        ],
    "rows": []
  };
  var depreciation = calcs.financialMetrics.paymentPerPeriod / (365 / parseInt($("#input-payments-per-year").val()));
  var insurance = parseInt($("#input-insurance-payment").val()) / 30;
  data.rows.push({"c":[{"v":"Labor Cost","f":null},{"v":calcs.laborCost,"f":"$" + calcs.laborCost}]});
  data.rows.push({"c":[{"v":"Fuel Cost","f":null},{"v":calcs.fuelCost,"f":"$" + calcs.fuelCost}]});
  data.rows.push({"c":[{"v":"Depreciation","f":null},{"v":depreciation,"f":"$" + depreciation}]});
  data.rows.push({"c":[{"v":"Insurance","f":null},{"v":insurance,"f":"$" + insurance}]});

  var expenses = $("#expenses-inputs-container").find("input");
  var labels = $("#expenses-inputs-container").find("label");
  for (var i = 0; i < expenses.length; i++) {
    var num = parseInt($(expenses[i]).val());
    data.rows.push({"c":[{"v":$(labels[i]).text(),"f":null},{"v":num,"f":"$" + num}]});
  }

  $('#cost-breakdown').attr('data', JSON.stringify(data));
  graph.drawChart();
};

calcMisc = function(financialMetrics) {
  var goodsSold = parseInt($("#input-goods-sold").val()),
      profitMargin = parseInt($("#input-profit-margin").val()) / 100;
  var margin = Math.round(goodsSold * profitMargin * 100) / 100;
  var periods = parseInt($("#input-payments-per-year").val());
  var expenses = $("#expenses-inputs-container").find("input");
  var totalExpenses = 0;
  for (var i = 0; i < expenses.length; i++) {
    totalExpenses += parseInt($(expenses[i]).val());
  }
  totalExpenses += financialMetrics.paymentPerPeriod / (365 / periods);
  totalExpenses += parseInt($("#input-insurance-payment").val()) / 30;
  totalExpenses = Math.round(totalExpenses * 100) / 100;
  return {
    totalExpenses: totalExpenses,
    margin: margin
  };
};

calcFuelCost = function(miles) {
  var mpg = parseInt($("#input-miles-per-gallon").val()),
      price = parseInt($("#input-average-gas-price").val());

  return (miles / mpg) * price;
};

calcDepreciation = function() {
  var amount = parseInt($("#input-loan-amount").val()),
      term = parseInt($("#input-term-of-loan-in-years").val()),
      rate = parseInt($("#input-annual-interest-rate").val()),
      periods = parseInt($("#input-payments-per-year").val());

  var ratePerPeriod = Math.round(((1 + (rate/100)/periods) - 1) * 10000) / 10000,
      paymentPerPeriod = Math.round(((ratePerPeriod * amount) / (1 - (Math.pow((1 + ratePerPeriod), -1 * periods * term)))) * 100) / 100,
      numPayments = Math.round(NPER(ratePerPeriod, paymentPerPeriod, -1 * amount)),
      totalPayment = Math.round((paymentPerPeriod * numPayments) * 100) / 100,
      totalInterest = Math.round((totalPayment - amount) * 100) / 100;

  return  {
    ratePerPeriod: ratePerPeriod,
    paymentPerPeriod: paymentPerPeriod,
    numPayments: numPayments,
    totalPayment: totalPayment,
    totalInterest: totalInterest
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
  var tasks = $("#tasks-inputs-container").find("input");
  var totalTime = 0;
  for (var i = 0; i < tasks.length; i++) {
    totalTime += parseInt($(tasks[i]).val());
  }
  return totalTime;
};

calcLaborCosts = function(hours) {
  var wages = $("#labor-inputs-container").find("input");
  var totalLaborCost = 0;
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
  directionsService.route(req, function(res, status){
    if (status == google.maps.DirectionsStatus.OK) {
      runCalculations(res);
    } else {
      alert ('failed to get directions');
    }    
  });
};
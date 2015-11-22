function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function reset() {
  $("iron-pages").html("<div id=\"one\" class=\"page\"><div class=\"mdl-cell mdl-cell--12-col\"><form action=\"#\" id=\"driving-stats-form\" onsubmit=\"return false;\"> <strong>Where are you coming from and where are you headed?<\/strong><br><div id=\"driving-stats-inputs-container\" class=\"mdl-cell mdl-cell--6-col\"><form-input options=\'{\"label\": \"Home\", \"placeholder\": \"12 Example Street, Boston, MA\", \"type\": \"text\"}\'><\/form-input><form-input options=\'{\"label\": \"Destination\", \"placeholder\": \"42 Example Road, Providence, RI\", \"type\": \"text\"}\'><\/form-input><\/div><div class=\"button-container\"> <button id=\"remove-destination\" onclick=\"removeDestination()\" class=\"mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored hidden\"> <i class=\"material-icons\">close<\/i> <\/button><div class=\"mdl-tooltip\" for=\"remove-destination\"> Remove a destination<\/div> <button id=\"add-new-destination\" onclick=\"appendDestination()\" class=\"mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored\"> <i class=\"material-icons\">add<\/i> <\/button><div class=\"mdl-tooltip\" for=\"add-new-destination\"> Add another destination<\/div><\/div><\/form><\/div><\/div><div id=\"two\" class=\"page\"><div class=\"mdl-cell mdl-cell--12-col\"><form action=\"#\" id=\"time-not-farming\"> <strong>You\'re doing more than driving. Break down today\'s todo list.<\/strong><br><div id=\"tasks-inputs-container\" class=\"mdl-cell mdl-cell--6-col\"><form-input options=\'{\"label\": \"Time-At-Market\", \"suffix\": \"hour(s)\", \"type\": \"number\", \"placeholder\": \"3\"}\'><\/form-input><form-input options=\'{\"label\": \"Time-Unloading\", \"suffix\": \"hour(s)\", \"type\": \"number\", \"placeholder\": \"1\"}\'><\/form-input><\/div><div class=\"button-container\"> <button id=\"remove-task\" onclick=\"removeTask()\" class=\"mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored\"> <i class=\"material-icons\">close<\/i> <\/button><div class=\"mdl-tooltip\" for=\"remove-task\"> Remove a task<\/div> <button id=\"add-new-task\" onclick=\"appendTask()\" class=\"mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored\"> <i class=\"material-icons\">add<\/i> <\/button><div class=\"mdl-tooltip\" for=\"add-new-task\"> Add another task<\/div><\/div><\/form><\/div><\/div><div id=\"three\" class=\"page\"><div class=\"mdl-cell mdl-cell--12-col\"><form action=\"#\" id=\"labor-costs\"> <strong>Who\'s putting in their time and what\'re they getting paid?<\/strong><br><div id=\"labor-inputs-container\" class=\"mdl-cell mdl-cell--6-col\"><form-input options=\'{\"label\": \"Driver\", \"prefix\": \"$\", \"placeholder\": \"10.00\", \"suffix\": \"per hour\", \"type\": \"number\"}\'><\/form-input><form-input options=\'{\"label\": \"Packer\", \"prefix\": \"$\", \"placeholder\": \"10.00\", \"suffix\": \"per hour\", \"type\": \"number\"}\'><\/form-input><\/div><div class=\"button-container\"> <button id=\"remove-worker\" onclick=\"removeWorker()\" class=\"mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored\"> <i class=\"material-icons\">close<\/i> <\/button><div class=\"mdl-tooltip\" for=\"remove-worker\"> Remove a worker<\/div> <button id=\"add-new-worker\" onclick=\"appendWorker()\" class=\"mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored\"> <i class=\"material-icons\">add<\/i> <\/button><div class=\"mdl-tooltip\" for=\"add-new-worker\"> Add another worker<\/div><\/div><\/form><\/div><\/div><div id=\"four\" class=\"page\"><div class=\"mdl-cell mdl-cell--12-col\"><form action=\"#\" id=\"vehicle-costs\"> <strong>What kind of wheels do you have and what does it cost to keep \'em rolling?<\/strong><br><div id=\"vehicle-inputs-container\"><div class=\"mdl-cell mdl-cell--6-col inline-block\"><form-input options=\'{\"label\": \"Loan-Amount\", \"prefix\": \"$\", \"placeholder\": \"35000\", \"type\": \"number\"}\'><\/form-input><form-input options=\'{\"label\": \"Term-of-Loan-in-Years\", \"suffix\": \"years\", \"placeholder\": \"7\", \"type\": \"number\"}\'><\/form-input><form-input options=\'{\"label\": \"Annual-Interest-Rate\", \"suffix\": \"%\", \"placeholder\": \"5\", \"type\": \"number\"}\'><\/form-input><form-input options=\'{\"label\": \"Payments-per-Year\", \"placeholder\": \"12\", \"suffix\": \"payments\", \"type\": \"number\"}\'><\/form-input><\/div><div class=\"mdl-cell mdl-cell--6-col inline-block\"><form-input options=\'{\"label\": \"Insurance-Payment\", \"prefix\": \"$\", \"placeholder\": \"20.00\", \"type\": \"number\"}\'><\/form-input><form-input options=\'{\"label\": \"Miles-per-Gallon\", \"suffix\": \"mpg\", \"placeholder\": \"35\", \"type\": \"number\"}\'><\/form-input><form-input options=\'{\"label\": \"Average-Gas-Price\", \"prefix\": \"$\", \"placeholder\": \"3.00\", \"type\": \"number\"}\'><\/form-input><\/div><\/div><\/form><\/div><\/div><div id=\"five\" class=\"page\"><div class=\"mdl-cell mdl-cell--12-col\"><form action=\"#\" id=\"nitty-gritty\"> <strong>Now it\'s time for the nitty gritty. Count up all those $ and \u00A2.<\/strong><br><div id=\"profits-inputs-container\" class=\"mdl-cell mdl-cell--5-col inline-block\"><h5>Profits<\/h5><form-input options=\'{\"label\": \"Goods-Sold\", \"prefix\": \"$\", \"placeholder\": \"850.00\", \"type\": \"number\"}\'><\/form-input><form-input options=\'{\"label\": \"Profit-Margin\", \"suffix\": \"%\", \"placeholder\": \"45\", \"type\": \"number\"}\'><\/form-input><\/div><div id=\"expenses-inputs-container\" class=\"mdl-cell mdl-cell--5-col inline-block\"><h5>Expenses<\/h5><form-input options=\'{\"label\": \"Delivery-Fee\", \"prefix\": \"$\", \"placeholder\": \"5.00\", \"type\": \"number\"}\'><\/form-input><form-input options=\'{\"label\": \"Parking-Fee\", \"prefix\": \"$\", \"placeholder\": \"5.00\", \"type\": \"number\"}\'><\/form-input><\/div><div class=\"button-container\"> <button id=\"remove-expense\" onclick=\"removeExpense()\" class=\"mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored\"> <i class=\"material-icons\">close<\/i> <\/button><div class=\"mdl-tooltip\" for=\"remove-expense\"> Remove an expense<\/div> <button id=\"add-new-expense\" onclick=\"appendExpense()\" class=\"mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored\"> <i class=\"material-icons\">add<\/i> <\/button><div class=\"mdl-tooltip\" for=\"add-new-expense\"> Add another expense<\/div><\/div><\/form><\/div><\/div><div id=\"six\" class=\"page\"><h1>Results<\/h1><div class=\"mdl-cell mdl-cell--12-col\" id=\"results\"><p id=\"driving-stats\"><\/p><p id=\"time-spent\"><\/p><p id=\"costs\"><\/p><p id=\"finances\"><\/p><h3 id=\"break-even\"><\/h3><\/div><div class=\"mdl-cell mdl-cell--12-col\" id=\"google-charts-wrapper\"> <google-chart type=\'pie\' options=\'{\"title\": \"Breakdown of Distribution Costs\"}\' id=\"cost-breakdown\"> <\/google-chart><\/div><div class=\"mdl-cell mdl-cell--12-col\" id=\"google-map-wrapper\"> <google-map id=\"google-map\"><\/google-map><\/div><\/div>")
  pages = $('#pages-container').children();
}

var directionsDisplay, directionsService, map, graph, pages, currentPage;
var $destinationfields, 
    $emptydestinationFields,
    $taskfields, 
    $emptytaskFields,
    $laborfields, 
    $emptylaborFields,
    $loanfields, 
    $emptyloanFields,
    $expensefields, 
    $emptyexpenseFields;
$(document).ready(function(){
  pages = $('#pages-container').children();
  currentPage = 0;
  graph = document.querySelector('google-chart');
  map = document.querySelector('google-map');
  map.latitude = 37.77493;
  map.longitude = -122.41942;
  map.addEventListener('google-map-ready', function(e) {
    directionsService = new google.maps.DirectionsService();
    directionsDisplay = new google.maps.DirectionsRenderer();
    setTimeout(function(){
      $("#loading").css("margin-top", "-100vh");
    }, 300);
  });

  $(".mdl-button").click(function(e){
    e.preventDefault();
  });

  $("#skip").click(function(){
    $destinationfields = $("#driving-stats-form input[id^='input']");
    $expensefields = $("#nitty-gritty input[id^='input']");
    $laborfields = $("#labor-costs input[id^='input']");
    $taskfields = $("#time-not-farming input[id^='input']");
    $loanfields = $("#vehicle-costs input[id^='input']");
    if (currentPage === 1) {
      for (var i = 0; i < $taskfields.length; i++) {
        $($taskfields[i]).val(0)
      }
    } else if (currentPage === 2) {
      for (var i = 0; i < $laborfields.length; i++) {
        $($laborfields[i]).val(12)
      }
    } else if (currentPage === 3) {
      for (var i = 0; i < $loanfields.length; i++) {
        $($loanfields[i]).val(0)
      }
    }
    $(pages[currentPage]).removeClass('iron-selected');
    if (currentPage + 1 < pages.length) {
      if (currentPage === 0) {
        $emptydestinationFields = $destinationfields.filter(function() {
            return $.trim(this.value) === "";
        });
        if (!$emptydestinationFields.length) {
            currentPage += 1;
        } else {
          $("#error-toast").attr("text", "Uh-oh! Looks like you didn't fill out all the fields on this page!");
          $("#error-toast>span.retry").addClass("hidden");
          document.querySelector('#error-toast').show();
        }
      } else if (currentPage === 1) {
        $emptytaskfields = $taskfields.filter(function() {
            return $.trim(this.value) === "";
        });
        if (!$emptytaskfields.length) {
            currentPage += 1;
        } else {
          $("#error-toast").attr("text", "Uh-oh! Looks like you didn't fill out all the fields on this page!");
          $("#error-toast>span.retry").addClass("hidden");
          document.querySelector('#error-toast').show();
        }
      } else if (currentPage === 2) {
        $emptylaborFields = $laborfields.filter(function() {
            return $.trim(this.value) === "";
        });
        if (!$emptylaborFields.length) {
            currentPage += 1;
        } else {
          $("#error-toast").attr("text", "Uh-oh! Looks like you didn't fill out all the fields on this page!");
          $("#error-toast>span.retry").addClass("hidden");
          document.querySelector('#error-toast').show();
        }
      } else if (currentPage === 3) {
        $emptyloanFields = $loanfields.filter(function() {
            return $.trim(this.value) === "";
        });
        if (!$emptyloanFields.length) {
            currentPage += 1;
        } else {
          $("#error-toast").attr("text", "Uh-oh! Looks like you didn't fill out all the fields on this page!");
          $("#error-toast>span.retry").addClass("hidden");
          document.querySelector('#error-toast').show();
        }
      } else if (currentPage === 4) {
        $emptyexpenseFields = $expensefields.filter(function() {
            return $.trim(this.value) === "";
        });
        if (!$emptyexpenseFields.length) {
            currentPage += 1;
            $("#loading").css("margin-top", "0");
        } else {
          $("#error-toast").attr("text", "Uh-oh! Looks like you didn't fill out all the fields on this page!");
          $("#error-toast>span.retry").addClass("hidden");
          document.querySelector('#error-toast').show();
        }
      } else {
        currentPage += 1;
      }
    } else {
      currentPage = 0;
      reset();
    }
    $(pages[currentPage]).addClass('iron-selected');
    if (currentPage === 0) {
      $("#prevPage").css("display", "none");
    } else {
      $("#prevPage").css("display", "inline-block");
    }
    if (currentPage === 0 || currentPage === 4 || currentPage === 5) {
      $("#skip").css("display", "none");
    } else {
      $("#skip").css("display", "inline-block");
    }
    if (currentPage === 5) {
      calcDrivingStats();
      $("#nextPage>paper-material").html("Restart <iron-icon icon=\"chevron-right\"></iron-icon>");
      $("#nextPage>paper-material").css("background-color", "#eeff41");
    } else {
      $("#nextPage>paper-material").html("Next <iron-icon icon=\"chevron-right\"></iron-icon>");
      $("#nextPage>paper-material").css("background-color", "#fff");
    }
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
    if (currentPage === 0 || currentPage === 4 || currentPage === 5) {
      $("#skip").css("display", "none");
    } else {
      $("#skip").css("display", "inline-block");
    }
    if (currentPage === 5) {
      $("#nextPage>paper-material").html("Restart <iron-icon icon=\"chevron-right\"></iron-icon>");
      $("#nextPage>paper-material").css("background-color", "#eeff41");
      $("#nextPage").addClass("reset");
    } else {
      $("#nextPage>paper-material").html("Next <iron-icon icon=\"chevron-right\"></iron-icon>");
      $("#nextPage>paper-material").css("background-color", "#fff");
    }
  });
  $("#nextPage").click(function(){
    $destinationfields = $("#driving-stats-form input[id^='input']");
    $expensefields = $("#nitty-gritty input[id^='input']");
    $laborfields = $("#labor-costs input[id^='input']");
    $taskfields = $("#time-not-farming input[id^='input']");
    $loanfields = $("#vehicle-costs input[id^='input']");
    $(pages[currentPage]).removeClass('iron-selected');
    if (currentPage + 1 < pages.length) {
      if (currentPage === 0) {
        $emptydestinationFields = $destinationfields.filter(function() {
            return $.trim(this.value) === "";
        });
        if (!$emptydestinationFields.length) {
            currentPage += 1;
        } else {
          $("#error-toast").attr("text", "Uh-oh! Looks like you didn't fill out all the fields on this page!");
          $("#error-toast>span.retry").addClass("hidden");
          document.querySelector('#error-toast').show();
        }
      } else if (currentPage === 1) {
        $emptytaskfields = $taskfields.filter(function() {
            return $.trim(this.value) === "";
        });
        if (!$emptytaskfields.length) {
            currentPage += 1;
        } else {
          $("#error-toast").attr("text", "Uh-oh! Looks like you didn't fill out all the fields on this page!");
          $("#error-toast>span.retry").addClass("hidden");
          document.querySelector('#error-toast').show();
        }
      } else if (currentPage === 2) {
        $emptylaborFields = $laborfields.filter(function() {
            return $.trim(this.value) === "";
        });
        if (!$emptylaborFields.length) {
            currentPage += 1;
        } else {
          $("#error-toast").attr("text", "Uh-oh! Looks like you didn't fill out all the fields on this page!");
          $("#error-toast>span.retry").addClass("hidden");
          document.querySelector('#error-toast').show();
        }
      } else if (currentPage === 3) {
        $emptyloanFields = $loanfields.filter(function() {
            return $.trim(this.value) === "";
        });
        if (!$emptyloanFields.length) {
            currentPage += 1;
        } else {
          $("#error-toast").attr("text", "Uh-oh! Looks like you didn't fill out all the fields on this page!");
          $("#error-toast>span.retry").addClass("hidden");
          document.querySelector('#error-toast').show();
        }
      } else if (currentPage === 4) {
        $emptyexpenseFields = $expensefields.filter(function() {
            return $.trim(this.value) === "";
        });
        if (!$emptyexpenseFields.length) {
            currentPage += 1;
            $("#loading").css("margin-top", "0");
        } else {
          $("#error-toast").attr("text", "Uh-oh! Looks like you didn't fill out all the fields on this page!");
          $("#error-toast>span.retry").addClass("hidden");
          document.querySelector('#error-toast').show();
        }
      } else {
        currentPage += 1;
      }
    } else {
      currentPage = 0;
      reset();
    }
    $(pages[currentPage]).addClass('iron-selected');
    if (currentPage === 0) {
      $("#prevPage").css("display", "none");
    } else {
      $("#prevPage").css("display", "inline-block");
    }
    if (currentPage === 0 || currentPage === 4 || currentPage === 5) {
      $("#skip").css("display", "none");
    } else {
      $("#skip").css("display", "inline-block");
    }
    if (currentPage === 5) {
      calcDrivingStats();
      $("#nextPage>paper-material").html("Restart <iron-icon icon=\"chevron-right\"></iron-icon>");
      $("#nextPage>paper-material").css("background-color", "#eeff41");
    } else {
      $("#nextPage>paper-material").html("Next <iron-icon icon=\"chevron-right\"></iron-icon>");
      $("#nextPage>paper-material").css("background-color", "#fff");
    }
  });
});

var destinationCount = 2,
    taskCount = 3,
    workerCount = 3,
    expenseCount = 3;
appendExpense = function() {
  $("#expenses-inputs-container").append("<form-input options='{\"label\": \"Expense-" + expenseCount + "\", \"prefix\": \"$\", \"placeholder\": \"5.00\", \"type\": \"number\"}'></form-input>");
  expenseCount += 1;
  if (expenseCount > 2) {
    $("#remove-expense").removeClass("hidden");
  }
  $expensefields = $("#nitty-gritty input[id^='input']");
};
appendWorker = function() {
  $("#labor-inputs-container").append("<form-input options='{\"label\": \"Worker-" + workerCount + "\", \"prefix\": \"$\", \"placeholder\": \"10.00\", \"suffix\": \"per hour\", \"type\": \"number\"}'></form-input>");
  workerCount += 1;
  if (workerCount > 2) {
    $("#remove-worker").removeClass("hidden");
  }
  $laborfields = $("#labor-costs input[id^='input']");
};
appendTask = function() {
  $("#tasks-inputs-container").append("<form-input options='{\"label\": \"Task-" + taskCount + "\", \"suffix\": \"hour(s)\", \"type\": \"number\", \"placeholder\": \"2\"}'></form-input>");
  taskCount += 1;
  if (taskCount > 2) {
    $("#remove-task").removeClass("hidden");
  }
  $taskfields = $("#time-not-farming input[id^='input']");
};
appendDestination = function() {
  $("#driving-stats-inputs-container").append("<form-input options='{\"label\": \"Destination-" + destinationCount + "\", \"placeholder\": \"Address\", \"type\": \"text\"}'></form-input>");
  destinationCount += 1;
  if (destinationCount > 2) {
    $("#remove-destination").removeClass("hidden");
  }
  $destinationfields = $("#driving-stats-form input[id^='input']");
};

removeDestination = function() {
  if (destinationCount > 2) {
    $("#driving-stats-inputs-container form-input:last-child").remove();
    destinationCount -= 1;
    if (destinationCount < 3) {
      $("#remove-destination").addClass("hidden");
    }
    $destinationfields = $("#driving-stats-form input[id^='input']");
  }  
};
removeExpense = function() {
  if (expenseCount > 2) {
    $("#expenses-inputs-container form-input:last-child").remove();
    expenseCount -= 1;
    if (expenseCount < 3) {
      $("#remove-expense").addClass("hidden");
    }
    $expensefields = $("#nitty-gritty input[id^='input']");
  }
};
removeWorker = function() {
  if (workerCount > 2) {
    $("#labor-inputs-container form-input:last-child").remove();
    workerCount -= 1;
    if (workerCount < 3) {
      $("#remove-worker").addClass("hidden");
    }
    $laborfields = $("#labor-costs input[id^='input']");
  }
};
removeTask = function() {
  if (taskCount > 2) {
    $("#tasks-inputs-container form-input:last-child").remove();
    taskCount -= 1;
    if (taskCount < 3) {
      $("#remove-task").addClass("hidden");
    }
    $taskfields = $("#time-not-farming input[id^='input']");
  }
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
  console.log(calcs);
  var totalTime = (Math.round((calcs.taskTime + (calcs.drivingStats[1].value / 60 / 60)) * 10) / 10);
  var costOfDistribution = Math.round((calcs.laborCost + calcs.fuelCost + calcs.misc.totalExpenses) * 100) / 100;
  var breakEven = Math.round((costOfDistribution / (parseInt($("#input-profit-margin").val()) / 100)) * 100) / 100;
  $("#driving-stats").html(numberWithCommas(Math.round(calcs.drivingStats[0].value / 1609.34)));
  var sittingTime = Math.round(((calcs.drivingStats[1].value / 60 / 60) / totalTime) * 100);
  $("#time-spent").html(numberWithCommas(totalTime));
  $("#costs").html("$" + numberWithCommas(costOfDistribution));
  $("#break-even").html("$" + numberWithCommas(breakEven));
  map = new google.maps.Map(document.getElementById("google-map"));
  directionsDisplay.setMap(map);
  directionsDisplay.setDirections(res);
  loadGraph(calcs);
  $("#loading").css("margin-top", "-100vh");
};

loadGraph = function(calcs) {
  data = {
    "cols": [
          {"id":"","label":"Type","pattern":"","type":"string"},
          {"id":"","label":"Cost","pattern":"","type":"number"}
        ],
    "rows": []
  };
  var depreciation = Math.round((calcs.financialMetrics.paymentPerPeriod / (365 / parseInt($("#input-payments-per-year").val()))) * 100) / 100;
  var insurance = Math.round((parseInt($("#input-monthly-insurance-payment").val()) / 30) * 100) / 100;
  data.rows.push({"c":[{"v":"Labor Cost","f":null},{"v":calcs.laborCost,"f":"$" + calcs.laborCost}]});
  data.rows.push({"c":[{"v":"Fuel Cost","f":null},{"v":calcs.fuelCost,"f":"$" + calcs.fuelCost}]});
  data.rows.push({"c":[{"v":"Depreciation","f":null},{"v":depreciation,"f":"$" + depreciation}]});
  data.rows.push({"c":[{"v":"Insurance","f":null},{"v":insurance,"f":"$" + insurance}]});

  console.log(data.rows)

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
  totalExpenses += parseInt($("#input-monthly-insurance-payment").val()) / 30;
  totalExpenses = Math.round(totalExpenses * 100) / 100;
  return {
    totalExpenses: totalExpenses,
    margin: margin
  };
};

calcFuelCost = function(miles) {
  console.log("miles: " + miles)
  var mpg = parseInt($("#input-miles-per-gallon").val()),
      price = parseInt($("#input-gas-price-per-gallon").val());

  console.log("mpg: " + mpg + ", price: " + price)
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
  $("#loading").css("margin-top", "0");
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
      $("#loading").css("margin-top", "-100vh");
      $("#error-toast").attr("text", "Failed to get directions! Status: " + status);
      $("#error-toast>span.retry").removeClass("hidden");
      console.error("Google Maps API Status: " + status);
      document.querySelector('#error-toast').show();
    }    
  });
};

function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: -33.8688, lng: 151.2195},
    zoom: 13
  });
  var input = /** @type {!HTMLInputElement} */(
      document.getElementById('pac-input'));

  var types = document.getElementById('type-selector');
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(types);

  var autocomplete = new google.maps.places.Autocomplete(input);
  autocomplete.bindTo('bounds', map);

  var infowindow = new google.maps.InfoWindow();
  var marker = new google.maps.Marker({
    map: map,
    anchorPoint: new google.maps.Point(0, -29)
  });

  autocomplete.addListener('place_changed', function() {
    infowindow.close();
    marker.setVisible(false);
    var place = autocomplete.getPlace();
    if (!place.geometry) {
      window.alert("Autocomplete's returned place contains no geometry");
      return;
    }

    // If the place has a geometry, then present it on a map.
    if (place.geometry.viewport) {
      map.fitBounds(place.geometry.viewport);
    } else {
      map.setCenter(place.geometry.location);
      map.setZoom(17);  // Why 17? Because it looks good.
    }
    marker.setIcon(/** @type {google.maps.Icon} */({
      url: place.icon,
      size: new google.maps.Size(71, 71),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(17, 34),
      scaledSize: new google.maps.Size(35, 35)
    }));
    marker.setPosition(place.geometry.location);
    marker.setVisible(true);

    var address = '';
    if (place.address_components) {
      address = [
        (place.address_components[0] && place.address_components[0].short_name || ''),
        (place.address_components[1] && place.address_components[1].short_name || ''),
        (place.address_components[2] && place.address_components[2].short_name || '')
      ].join(' ');
    }

    infowindow.setContent('<div><strong>' + place.name + '</strong><br>' + address);
    infowindow.open(map, marker);
  });

  // Sets a listener on a radio button to change the filter type on Places
  // Autocomplete.
  function setupClickListener(id, types) {
    var radioButton = document.getElementById(id);
    radioButton.addEventListener('click', function() {
      autocomplete.setTypes(types);
    });
  }

  setupClickListener('changetype-all', []);
  setupClickListener('changetype-address', ['address']);
  setupClickListener('changetype-establishment', ['establishment']);
  setupClickListener('changetype-geocode', ['geocode']);
}
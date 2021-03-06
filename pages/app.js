var axtriaApp = angular.module('axtriaApp', ['ngRoute']);

// configure routes
axtriaApp.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
  $routeProvider
    .when('/query', {
      templateUrl: '/query.html'
    })
    .when('/report', {
      templateUrl: '/report.html'
    })
    /*.when('/graph', {
      templateUrl: '/pages/graph.html',
      //controller: 'graphController'
    });*/
}]);

axtriaApp.filter('startFrom', function() {
  return function(input, start) {
    if (!input || !input.length) { return; }
    start = +start;
    return input.slice(start);
  };
});

// create the controller and inject Angular's $scope
axtriaApp.controller('mainController', ['$scope', '$location', function($scope, $location) {
  $scope.cohort = [];
  $scope.kickout = [];
  $scope.pageSize = 20;
  $scope.cPageNum = 0;
  $scope.kPageNum = 0;
  $scope.cohortPageCount = function() {
    return Math.floor($scope.cohort.length / $scope.pageSize);
  };
  $scope.kickoutPageCount = function() {
    return Math.floor($scope.kickout.length / $scope.pageSize);
  };

  $scope.inputData = {
    // default values
    srcTable: 'inpatient_services_table',
    xz: 3,
    monOrDay: 'month',
    gapDays: 45,
    indexDate: new Date(2012, 01, 01),
    minAge: 18,
    srcItems: ['inpatient_services_table', 'outpatient_services_table'],
    monItems: ['month', 'day'],
  };

  $scope.changeTable = function(item) {
    $scope.inputData.srcTable = item.value;
    //console.log($scope.inputData.srcTable);
  };
  $scope.changeMonOrDay = function(item) {
    $scope.inputData.monOrDay = item.value;
  }

  $scope.showCohort = function() {
    $("#cohortTab").addClass("active");
    $("#kickoutTab").removeClass("active");
    $("#cohort-display").show(200);
    $("#kickout-display").hide(200);
  };

  $scope.showKickout = function() {
    $("#cohortTab").removeClass("active");
    $("#kickoutTab").addClass("active");
    $("#cohort-display").hide(200);
    $("#kickout-display").show(200);
  };

  $scope.downloadCSV = function(filename) {
    let data = filename == 'cohort.csv' ? $scope.cohort : $scope.kickout;
    let csv = '';
    angular.forEach(data, function(row) {
      csv += row.join(',');
      csv += '\n';
    });
    if (csv.length == 0) return;

    let link = document.createElement('a');
    let blob = new Blob([csv], {type: 'text/csv'});
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
  };

  var socket = io.connect('http://localhost:3000');
  $scope.submitQuery = function() {
    // days of continuous enrollment
    let contDays = $scope.inputData.monOrDay === 'month' ? $scope.inputData.xz*30 : $scope.inputData.xz;
    let data = {
      contEnroll: contDays,
      indexDate: $scope.inputData.indexDate,
      adultYear: $scope.inputData.minAge,
      gapDays: $scope.inputData.gapDays,
      srcTable: $scope.inputData.srcTable,
    };
    //alert(JSON.stringify(data));
    socket.emit('query', data);
    //$("#link-report").click();
    $location.path('/report');
  }

  socket.on('cohort', function(res) {
    $scope.cohort = res;
  });
  socket.on('kickout', function(res) {
    $scope.kickout = res;
  });

  $(document).ready(function() {
    // trigger click event on link-query
    $("#link-query").click();
    // bind logout event on link-logout
    $("#link-logout").click(function() {
      $.get('http://localhost:3000/logout', function(text) {
        document.write(text);
      });
    });
  });
}]);

/*axtriaApp.controller('graphController', function($scope) {
  $scope.message = 'This message is from graphController';
});*/

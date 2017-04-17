/**
 * Created by Quentin on 03/04/2017.
 */

document.addEventListener('deviceready', function () {
    // Code begin app

}, false);

var app = angular.module('app', []);

app.config(function ($routeProvider) {
  $routeProvider
      .when('/apis', {templateUrl: 'partials/apis.html'})
      .when('/documentationAPIs/:id', {templateUrl: 'partials/apis/documentationAPIs.html'})
      .when('/applications', {templateUrl: 'partials/applications.html'})
      .when('/configuration', {templateUrl: 'partials/configuration.html'})
      .when('/dashboard', {templateUrl: 'partials/dashboard.html'})
      .when('/instances', {templateUrl: 'partials/instances.html'})
      .otherwise({redirectTo: 'apis'})
})
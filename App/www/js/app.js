/**
 * Created by Quentin on 03/04/2017.
 */

document.addEventListener('deviceready', function () {
    // Code begin app

}, false);

var app = angular.module('app', []);

app.config(['$httpProvider', function($httpProvider) {
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common["X-Requested-With"];
}]);

app.config(function ($routeProvider) {
  $routeProvider
      .when('/apis', {templateUrl: 'partials/apis.html'})
      /* .when('/createAPI', {templateUrl: 'partials/apis/createAPI.html'})  -- Read-only */
      .when('/generalAPIs/:id', {templateUrl: 'partials/apis/generalAPIs.html'})
      .when('/gatewayAPIs/:id', {templateUrl: 'partials/apis/gatewayAPIs.html'})
      .when('/analyticsAPIs/:id', {templateUrl: 'partials/apis/analyticsAPI.html'})
      .when('/applications', {templateUrl: 'partials/applications.html'})
      .when('/configuration', {templateUrl: 'partials/configuration.html'})
      .when('/configurationTags', {templateUrl: 'partials/configuration/shardingTags.html'})
      .when('/configurationTenants', {templateUrl: 'partials/configuration/tenants.html'})
      .when('/dashboard', {templateUrl: 'partials/dashboard.html'})
      .when('/instances', {templateUrl: 'partials/instances.html'})
      .when('/instancesEnvironment/:event', {templateUrl: 'partials/instances/environmentInstance.html'})
      .otherwise({redirectTo: 'apis'})
})

app.controller('navCtrl', ['$scope', function ($scope) {

    /* Username */
    $scope.username = localStorage.username;

    /* Checkbox -- mode */
    var body = document.getElementById('body');

    /* Switch example
    $('input').on('change', function(event){
        var $myCheckbox = $(this);
        if($myCheckbox.prop('checked')){
            var notification = document.getElementById('notif');
            notification.setAttribute('style','font-size: 14px; font-weight: 400; text-decoration: line-through;')
        } else {
            var notification = document.getElementById('notif');
            notification.setAttribute('style','font-size: 14px; font-weight: 400;')
        }
    }); */

    /* Menu */
    var menuConfig = document.getElementById('menuConfiguration');
    var menuAPIs = document.getElementById('menuAPIs');
    var menuGateway = document.getElementById('menuInstances');

    function resetMenu() {
        menuConfig.setAttribute('style','display: none');
        menuAPIs.setAttribute('style','display: none');
        menuGateway.setAttribute('style','display: none');
    }

    /* function showConfigurationMenu() {
        menuConfig.setAttribute('style','display: inline-block; width: 100%');
    } */

    function initButton() {
        var buttonAPIs = document.getElementById('apis');
        var buttonApplications = document.getElementById('applications');
        var buttonInstances = document.getElementById('instances');
        var buttonDashboard = document.getElementById('dashboard');
        // var buttonConfiguration = document.getElementById('configuration');

        initEventHandlers(buttonAPIs, 'click', function(){ resetMenu(); }); /* APIs */
        initEventHandlers(buttonApplications, 'click', function () { resetMenu() }); /* Applications */
        initEventHandlers(buttonInstances, 'click', function(){ resetMenu() }); /* Instances */
        initEventHandlers(buttonDashboard, 'click', function () { resetMenu() }); /* Dashboard */
        // initEventHandlers(buttonConfiguration, 'click', function () { resetMenu(); showConfigurationMenu(); }); /* Configuration */
    } // initButton

    function initEventHandlers(element, event, fx) {
        if (element.addEventListener)
            element.addEventListener(event, fx, false);
        else if (element.attachEvent)
            element.attachEvent('on' + event, fx);
    } // observe
    initEventHandlers(window, 'load', initButton);
}]);
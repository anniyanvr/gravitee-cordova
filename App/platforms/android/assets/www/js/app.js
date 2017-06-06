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

  // APIs
      .when('/apis', {templateUrl: 'partials/apis.html'})
      /* .when('/createAPI', {templateUrl: 'partials/apis/createAPI.html'})  -- Read-only */
      .when('/generalAPIs/:id', {templateUrl: 'partials/apis/generalAPIs.html'})
      .when('/gatewayAPIs/:id', {templateUrl: 'partials/apis/gatewayAPIs.html'})
      .when('/plansAPIs/:id', {templateUrl: 'partials/apis/plansAPI.html'})
      .when('/subAPIs/:id', {templateUrl: 'partials/apis/subscriptionAPIs.html'})
      .when('/resourcesAPIs/:id', {templateUrl: 'partials/apis/resourcesAPIs.html'})
      .when('/policiesAPIs/:id', {templateUrl: 'partials/apis/policiesAPIs.html'})
      .when('/membersAPIs/:id', {templateUrl: 'partials/apis/membersAPIs.html'})
      .when('/propertiesAPIs/:id', {templateUrl: 'partials/apis/propertiesAPIs.html'})
      .when('/analyticsAPIs/:id', {templateUrl: 'partials/apis/analyticsAPI.html'})
      .when('/healthCheckAPI/:id', {templateUrl: 'partials/apis/healthCheckAPI.html'})
      .when('/historyAPI/:id', {templateUrl: 'partials/apis/historyAPI.html'})
      .when('/eventsAPI/:id', {templateUrl: 'partials/apis/eventsAPIs.html'})

  // Applications
      .when('/applications', {templateUrl: 'partials/applications.html'})
      .when('/applicationGlobalSettings/:id', {templateUrl: 'partials/applications/globalSettingsApp.html'})
      .when('/applicationSubscription/:id', {templateUrl: 'partials/applications/subscriptionApp.html'})
      .when('/applicationMembers/:id', {templateUrl: 'partials/applications/membersApp.html'})
      .when('/applicationAnalytics/:id', {templateUrl: 'partials/applications/analyticsApp.html'})

  // Configuration
      .when('/configuration', {templateUrl: 'partials/configuration.html'})
      .when('/configurationTags', {templateUrl: 'partials/configuration/shardingTags.html'})
      .when('/configurationTenants', {templateUrl: 'partials/configuration/tenants.html'})
      .when('/configurationGroups', {templateUrl: 'partials/configuration/groups.html'})

  // Dashboard
      .when('/dashboard', {templateUrl: 'partials/dashboard.html'})

  // Instances
      .when('/instances', {templateUrl: 'partials/instances.html'})
      .when('/instancesEnvironment/:event', {templateUrl: 'partials/instances/environmentInstance.html'})
      .when('/instancesMonitoring/:event', {templateUrl: 'partials/instances/monitoringInstance.html'})

  // Otherwise
      .otherwise({redirectTo: 'apis'})
})

app.controller('navCtrl', ['$scope','$http', function ($scope,$http) {

    /* SignOut */
    $scope.signOut = function () {
        $http.post(localStorage.baseURL+'management/user/logout',{
            headers: { 'Authorization': 'Basic ' + localStorage.authorization }
        }).success(function (response) { document.location.href="index.html"; })
    }
    
    /* Authority */
    var constant = localStorage.baseURL+"constants.json";
    var authority = false;

    /* Username */
    $scope.username = localStorage.username;

    /* Picture */
    $http.get(localStorage.baseURL+'management/user/'+localStorage.username+'/picture',{
        headers: { 'Authorization': 'Basic ' + localStorage.authorization }
    }).success(function (response) { $scope.img_profil = response; })

    /* Menu */
    var menuConfig = document.getElementById('menuConfiguration');
    var menuAPIs = document.getElementById('menuAPIs');
    var menuApplications = document.getElementById('menuApplications');
    var menuGateway = document.getElementById('menuInstances');

    var buttonAPIs = document.getElementById('apis');
    var buttonApplications = document.getElementById('applications');
    var buttonInstances = document.getElementById('instances');
    var buttonDashboard = document.getElementById('dashboard');
    var buttonConfiguration = document.getElementById('configuration');

    if (authority === false){
        buttonInstances.setAttribute('style','display: none');
        buttonDashboard.setAttribute('style','display: none');
        buttonConfiguration.setAttribute('style','display: none');
    }

    // default
    buttonAPIs.setAttribute('style','background-color: rgba(0, 0, 0, 0.2);');

    function resetMenu() {

        buttonAPIs.setAttribute('style','background-color: white');
        buttonApplications.setAttribute('style','background-color: white');
        buttonInstances.setAttribute('style','background-color: white');
        buttonDashboard.setAttribute('style','background-color: white');
        buttonConfiguration.setAttribute('style','background-color: white');

        if (authority === false){
            buttonInstances.setAttribute('style','display: none');
            buttonDashboard.setAttribute('style','display: none');
            buttonConfiguration.setAttribute('style','display: none');
        }

        menuConfig.setAttribute('style','display: none');
        menuAPIs.setAttribute('style','display: none');
        menuApplications.setAttribute('style','display: none');
        menuGateway.setAttribute('style','display: none');
    }

    function color(button) {
        button.setAttribute('style','background-color: rgba(0, 0, 0, 0.2);');
    }

    function showConfigurationMenu() {
        menuConfig.setAttribute('style','display: inline-block; width: 100%');
        color(buttonConfiguration);
    }

    function initButton() {

        initEventHandlers(buttonAPIs, 'click',          function () { resetMenu(); color(buttonAPIs)            }); /* APIs */
        initEventHandlers(buttonApplications, 'click',  function () { resetMenu(); color(buttonApplications)    }); /* Applications */
        initEventHandlers(buttonInstances, 'click',     function () { resetMenu(); color(buttonInstances)       }); /* Instances */
        initEventHandlers(buttonDashboard, 'click',     function () { resetMenu(); color(buttonDashboard)       }); /* Dashboard */
        initEventHandlers(buttonConfiguration, 'click', function () { resetMenu(); showConfigurationMenu(); }); /* Configuration */
    } // initButton

    function initEventHandlers(element, event, fx) {
        if (element.addEventListener)
            element.addEventListener(event, fx, false);
        else if (element.attachEvent)
            element.attachEvent('on' + event, fx);
    } // observe
    initEventHandlers(window, 'load', initButton);

    var user = localStorage.baseURL + "management/user/"; // with login
    $http.get(user,{
        headers: {
            //'Authorization': 'Basic ' + encode(localStorage.username+':'+localStorage.password)
            'Authorization': 'Basic ' + localStorage.authorization
        }
    }).success(function (response) {
        for (var i=0;i<response.authorities.length;i++){
            //alert(response.authorities[i]["authority"]);
            if (response.authorities[i]["authority"] === "ADMIN"){
                authority = true;
                buttonInstances.setAttribute('style','display: inline');
                buttonDashboard.setAttribute('style','display: inline');
                buttonConfiguration.setAttribute('style','display: inline');

            }
        }
    })
}]);
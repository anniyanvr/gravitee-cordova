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
      .when('/plansAPIs/:id', {templateUrl: 'partials/apis/plansAPI.html'})
      .when('/policiesAPIs/:id', {templateUrl: 'partials/apis/policiesAPIs.html'})
      .when('/analyticsAPIs/:id', {templateUrl: 'partials/apis/analyticsAPI.html'})
      .when('/healthCheckAPI/:id', {templateUrl: 'partials/apis/healthCheckAPI.html'})
      .when('/historyAPI/:id', {templateUrl: 'partials/apis/historyAPI.html'})
      .when('/applications', {templateUrl: 'partials/applications.html'})
      .when('/applicationGlobalSettings/:id', {templateUrl: 'partials/applications/globalSettingsApp.html'})
      .when('/applicationAnalytics/:id', {templateUrl: 'partials/applications/analyticsApp.html'})
      .when('/configuration', {templateUrl: 'partials/configuration.html'})
      .when('/configurationTags', {templateUrl: 'partials/configuration/shardingTags.html'})
      .when('/configurationTenants', {templateUrl: 'partials/configuration/tenants.html'})
      .when('/dashboard', {templateUrl: 'partials/dashboard.html'})
      .when('/instances', {templateUrl: 'partials/instances.html'})
      .when('/instancesEnvironment/:event', {templateUrl: 'partials/instances/environmentInstance.html'})
      .when('/instancesMonitoring/:event', {templateUrl: 'partials/instances/monitoringInstance.html'})
      .otherwise({redirectTo: 'apis'})
})

app.controller('navCtrl', ['$scope','$http', function ($scope,$http) {

    /* Authority -- error 500 */
    var constant = localStorage.baseURL+"constants.json";
    $http.get(constant).success(function (response) {
        var user = response["baseURL"] + "user/"; // with login
        $http.get(user,{
            headers: {
                'Authorization': 'Basic ' + encode(localStorage.username+':'+localStorage.password)
            }
        }).success(function (response) {
            console.log(response["authorities"]);
        })
    });

    /* Username */
    $scope.username = localStorage.username;

    /* Checkbox -- mode -- example */
    // var body = document.getElementById('body');

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
    var menuApplications = document.getElementById('menuApplications');
    var menuGateway = document.getElementById('menuInstances');

    var buttonAPIs = document.getElementById('apis');
    var buttonApplications = document.getElementById('applications');
    var buttonInstances = document.getElementById('instances');
    var buttonDashboard = document.getElementById('dashboard');
    // var buttonConfiguration = document.getElementById('configuration');

    // default
    buttonAPIs.setAttribute('style','background-color: rgba(0, 0, 0, 0.2);');

    function resetMenu() {

        buttonAPIs.setAttribute('style','background-color: white');
        buttonApplications.setAttribute('style','background-color: white');
        buttonInstances.setAttribute('style','background-color: white');
        buttonDashboard.setAttribute('style','background-color: white');
        // buttonConfiguration.setAttribute('style','background-color: white');

        menuConfig.setAttribute('style','display: none');
        menuAPIs.setAttribute('style','display: none');
        menuApplications.setAttribute('style','display: none');
        menuGateway.setAttribute('style','display: none');
    }

    function color(button) {
        button.setAttribute('style','background-color: rgba(0, 0, 0, 0.2);');
    }

    /* function showConfigurationMenu() {
        menuConfig.setAttribute('style','display: inline-block; width: 100%');
        color(buttonConfiguration);
    } */

    function initButton() {

        initEventHandlers(buttonAPIs, 'click',          function () { resetMenu(); color(buttonAPIs)            }); /* APIs */
        initEventHandlers(buttonApplications, 'click',  function () { resetMenu(); color(buttonApplications)    }); /* Applications */
        initEventHandlers(buttonInstances, 'click',     function () { resetMenu(); color(buttonInstances)       }); /* Instances */
        initEventHandlers(buttonDashboard, 'click',     function () { resetMenu(); color(buttonDashboard)       }); /* Dashboard */
        // initEventHandlers(buttonConfiguration, 'click', function () { resetMenu(); showConfigurationMenu(); }); /* Configuration */
    } // initButton

    function initEventHandlers(element, event, fx) {
        if (element.addEventListener)
            element.addEventListener(event, fx, false);
        else if (element.attachEvent)
            element.attachEvent('on' + event, fx);
    } // observe
    initEventHandlers(window, 'load', initButton);


    var keyStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
    function encode(input) {
        var output = "";
        var chr1, chr2, chr3 = "";
        var enc1, enc2, enc3, enc4 = "";
        var i = 0;

        do {
            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);

            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;

            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            } else if (isNaN(chr3)) {
                enc4 = 64;
            }

            output = output +
                keyStr.charAt(enc1) +
                keyStr.charAt(enc2) +
                keyStr.charAt(enc3) +
                keyStr.charAt(enc4);
            chr1 = chr2 = chr3 = "";
            enc1 = enc2 = enc3 = enc4 = "";
        } while (i < input.length);

        return output;
    }
}]);
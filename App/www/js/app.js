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

// Routing
app.config(function ($routeProvider) {
  $routeProvider

  /* .when('/createAPI', {templateUrl: 'partials/apis/createAPI.html'})  -- Read-only */

  // APIs --------------------------------------------------------------------------------------------------------------
      // LIST OF APIS
      .when('/apis', {
          templateUrl: 'partials/apis.html',
          controller : apisCtrl,
          resolve : {
              apisList : function ($http) {
                  return $http.get(localStorage.baseURL+"management/apis/",{
                      headers: {
                          'Authorization': 'Basic ' + localStorage.authorization
                      }
                  }).success(function (response) {
                      return response;
                  }).error(function () {
                      document.location.href="index.html";
                  });
              },
              viewsList : function ($http) {
                  return $http.get(localStorage.baseURL + "management/configuration/views/", {
                      headers: {
                          'Authorization': 'Basic ' + localStorage.authorization
                      }
                  }).success(function (response) {
                      return response;
                  }).error(function () {

                      // reset values -- to avoid bug
                      localStorage.username = '';
                      localStorage.baseURL = '';
                      localStorage.authorization = '';

                      document.location.href = "index.html";
                  });
              }
          }
      })

      // GENERAL
      .when('/generalAPIs/:id', {
          templateUrl: 'partials/apis/generalAPIs.html',
          controller : apisCtrlGeneral,
          resolve : {
              myApi : function ($http, $route) {
                  // console.log($route.current.params.id);
                  return $http.get(localStorage.baseURL+"management/apis/"+$route.current.params.id+"/", {
                      headers: {
                          'Authorization': 'Basic ' + localStorage.authorization
                      }
                  }).success(function (response) {
                      return response;
                  }).error(function () {
                      document.location.href = "index.html";
                  });
              }
          }
      })

      // GATEWAY
      .when('/gatewayAPIs/:id', {
          templateUrl: 'partials/apis/gatewayAPIs.html',
          controller : apisCtrlGateway,
          resolve : {
              myApiGateway : function ($http, $route) {
                  // console.log($route.current.params.id);
                  return $http.get(localStorage.baseURL+"management/apis/"+$route.current.params.id+"/", {
                      headers: {
                          'Authorization': 'Basic ' + localStorage.authorization
                      }
                  }).success(function (response) {
                      return response;
                  }).error(function () {
                      document.location.href = "index.html";
                  });
              }
          }
      })

      // PLANS
      .when('/plansAPIs/:id', {
          templateUrl: 'partials/apis/plansAPI.html',
          controller : apisCtrlPlans,
          resolve : {
              myApiPlans : function ($http, $route) {
                  // console.log($route.current.params.id);
                  return $http.get(localStorage.baseURL+"management/apis/"+$route.current.params.id+"/", {
                      headers: {
                          'Authorization': 'Basic ' + localStorage.authorization
                      }
                  }).success(function (response) {
                      return response;
                  }).error(function () {
                      document.location.href = "index.html";
                  });
              },
              myApiPlansStatus : function ($http, $route) {
                  // console.log($route.current.params.id);
                  return $http.get(localStorage.baseURL+"management/apis/"+$route.current.params.id+"/plans?status=published", {
                      headers: {
                          'Authorization': 'Basic ' + localStorage.authorization
                      }
                  }).success(function (response) {
                      return response;
                  }).error(function () {
                      document.location.href = "index.html";
                  });
              }
          }
      })

      // SUBSCRIPTIONS
      .when('/subAPIs/:id', {
          templateUrl: 'partials/apis/subscriptionAPIs.html',
          controller : apisCtrlSubscription,
          resolve : {
              myApiInfo : function ($http, $route) {
                  return $http.get(localStorage.baseURL+"management/apis/"+$route.current.params.id+"/", {
                      headers: {
                          'Authorization': 'Basic ' + localStorage.authorization
                      }
                  }).success(function (response) {
                      return response;
                  }).error(function () {
                      document.location.href = "index.html";
                  });
              },
              myApiSub : function ($http, $route) {
                  return $http.get(localStorage.baseURL+"management/apis/"+$route.current.params.id+"/subscriptions", {
                      headers: {
                          'Authorization': 'Basic ' + localStorage.authorization
                      }
                  }).success(function (response) {
                      return response;
                  }).error(function () {
                      document.location.href = "index.html";
                  });
              }
          }
      })

      // RESOURCES
      .when('/resourcesAPIs/:id', {
          templateUrl: 'partials/apis/resourcesAPIs.html',
          controller : apisCtrlResources,
          resolve : {
              myApiResource : function ($http, $route) {
                  return $http.get(localStorage.baseURL+"management/apis/"+$route.current.params.id+"/", {
                      headers: {
                          'Authorization': 'Basic ' + localStorage.authorization
                      }
                  }).success(function (response) {
                      return response;
                  }).error(function () {
                      document.location.href = "index.html";
                  });
              }
          }
      })

      // POLICIES
      .when('/policiesAPIs/:id', {
          templateUrl: 'partials/apis/policiesAPIs.html',
          controller : apisCtrlPolicies,
          resolve : {
              myApiPoliciesInfo : function ($http, $route) {
                  return $http.get(localStorage.baseURL+"management/apis/"+$route.current.params.id+"/", {
                      headers: {
                          'Authorization': 'Basic ' + localStorage.authorization
                      }
                  }).success(function (response) {
                      return response;
                  }).error(function () {
                      document.location.href = "index.html";
                  });
              },
              myApiPolicies : function ($http, $route) {
                  return $http.get(localStorage.baseURL + "management/policies/", {
                      headers: {
                          'Authorization': 'Basic ' + localStorage.authorization
                      }
                  }).success(function (response) {
                      return response;
                  }).error(function () {
                      document.location.href = "index.html";
                  });
              }
          }
      })

      // MEMBERS
      .when('/membersAPIs/:id', {
          templateUrl: 'partials/apis/membersAPIs.html',
          controller : apisCtrlMembers,
          resolve : {
              myApiMembersInfo: function ($http, $route) {
                  return $http.get(localStorage.baseURL + "management/apis/" + $route.current.params.id + "/", {
                      headers: {
                          'Authorization': 'Basic ' + localStorage.authorization
                      }
                  }).success(function (response) {
                      return response;
                  }).error(function () {
                      document.location.href = "index.html";
                  });
              },
              myApiMembers: function ($http, $route) {
                  return $http.get(localStorage.baseURL + "management/apis/" + $route.current.params.id + "/members/", {
                      headers: {
                          'Authorization': 'Basic ' + localStorage.authorization
                      }
                  }).success(function (response) {
                      return response;
                  }).error(function () {
                      document.location.href = "index.html";
                  });
              }
          }
      })

      // PROPERTIES
      .when('/propertiesAPIs/:id', {
          templateUrl: 'partials/apis/propertiesAPIs.html',
          controller : apisCtrlProperties,
          resolve : {
              myApiProp: function ($http, $route) {
                  return $http.get(localStorage.baseURL + "management/apis/" + $route.current.params.id + "/", {
                      headers: {
                          'Authorization': 'Basic ' + localStorage.authorization
                      }
                  }).success(function (response) {
                      return response;
                  }).error(function () {
                      document.location.href = "index.html";
                  });
              }
          }
      })

      // ANALYTICS
      .when('/analyticsAPIs/:id', {templateUrl: 'partials/apis/analyticsAPI.html'})

      // DOCUMENTATION
      .when('/documentationAPI/:id', {templateUrl: 'partials/apis/documentationAPI.html'})

      // HEALTH_CHECK
      .when('/healthCheckAPI/:id', {templateUrl: 'partials/apis/healthCheckAPI.html'})

      // HISTORY
      .when('/historyAPI/:id', {
          templateUrl: 'partials/apis/historyAPI.html',
          controller : apisCtrlHistory,
          resolve : {
              myApiHistoInfo : function ($http, $route) {
                  return $http.get(localStorage.baseURL + "management/apis/" + $route.current.params.id + "/", {
                      headers: {
                          'Authorization': 'Basic ' + localStorage.authorization
                      }
                  }).success(function (response) {
                      return response;
                  }).error(function () {
                      document.location.href = "index.html";
                  });
              },
              myApiHistory : function ($http, $route) {
                  return $http.get(localStorage.baseURL + "management/apis/" + $route.current.params.id + "/events?type=PUBLISH_API", {
                      headers: {
                          'Authorization': 'Basic ' + localStorage.authorization
                      }
                  }).success(function (response) {
                      return response;
                  }).error(function () {
                      document.location.href = "index.html";
                  });
              }
          }
      })

      // EVENTS
      .when('/eventsAPI/:id', {
          templateUrl: 'partials/apis/eventsAPIs.html',
          controller : apisCtrlEvents,
          resolve : {
              myApiEventsInfos : function ($http, $route) {
                  return $http.get(localStorage.baseURL + "management/apis/" + $route.current.params.id + "/", {
                      headers: {
                          'Authorization': 'Basic ' + localStorage.authorization
                      }
                  }).success(function (response) {
                      return response;
                  }).error(function () {
                      document.location.href = "index.html";
                  });
              },
              myApiEvents : function ($http, $route) {
                  return $http.get(localStorage.baseURL + "management/apis/" + $route.current.params.id + "/events?type=START_API,STOP_API", {
                      headers: {
                          'Authorization': 'Basic ' + localStorage.authorization
                      }
                  }).success(function (response) {
                      return response;
                  }).error(function () {
                      document.location.href = "index.html";
                  });
              }
          }
      })

  // Applications ------------------------------------------------------------------------------------------------------
      // LIST OF APPLICATIONS
      .when('/applications', {
          templateUrl: 'partials/applications.html',
          controller : applicationCtrl,
          resolve : {
              appliList : function ($http) {
                  return $http.get(localStorage.baseURL+"management/applications/",{
                      headers: {
                          'Authorization': 'Basic ' + localStorage.authorization
                      }
                  }).success(function (response) {
                      return response;
                  }).error(function () {
                      document.location.href="index.html";
                  });
              }
          }
      })

      // GLOBAL_SETTINGS
      .when('/applicationGlobalSettings/:id', {
          templateUrl: 'partials/applications/globalSettingsApp.html',
          controller : applicationCtrlGlobalSettings,
          resolve : {
              applicationGeneral : function ($http, $route) {
                  return $http.get(localStorage.baseURL+"management/applications/"+$route.current.params.id+"/", {
                      headers: {
                          'Authorization': 'Basic ' + localStorage.authorization
                      }
                  }).success(function (response) {
                      return response;
                  }).error(function () {
                      document.location.href = "index.html";
                  });
              }
          }
      })

      // SUBSCRIPTION
      .when('/applicationSubscription/:id', {
          templateUrl: 'partials/applications/subscriptionApp.html',
          controller : applicationCtrlSubscription,
          resolve : {
              applicationSubGeneral : function ($http, $route) {
                  return $http.get(localStorage.baseURL+"management/applications/"+$route.current.params.id+"/", {
                      headers: {
                          'Authorization': 'Basic ' + localStorage.authorization
                      }
                  }).success(function (response) {
                      return response;
                  }).error(function () {
                      document.location.href = "index.html";
                  });
              },
              applicationSub : function ($http, $route) {
                  return $http.get(localStorage.baseURL+"management/applications/"+$route.current.params.id+"/subscriptions", {
                      headers: {
                          'Authorization': 'Basic ' + localStorage.authorization
                      }
                  }).success(function (response) {
                      return response;
                  }).error(function () {
                      document.location.href = "index.html";
                  });
              }
          }
      })

      // MEMBERS
      .when('/applicationMembers/:id', {
          templateUrl: 'partials/applications/membersApp.html',
          controller : applicationCtrlMembers,
          resolve : {
              applicationMembersGeneral : function ($http, $route) {
                  return $http.get(localStorage.baseURL+"management/applications/"+$route.current.params.id+"/", {
                      headers: {
                          'Authorization': 'Basic ' + localStorage.authorization
                      }
                  }).success(function (response) {
                      return response;
                  }).error(function () {
                      document.location.href = "index.html";
                  });
              },
              appliMembers : function ($http, $route) {
                  return $http.get(localStorage.baseURL+"management/applications/"+$route.current.params.id+"/members", {
                      headers: {
                          'Authorization': 'Basic ' + localStorage.authorization
                      }
                  }).success(function (response) {
                      return response;
                  }).error(function () {
                      document.location.href = "index.html";
                  });
              }
          }
      })

      // ANALYTICS
      .when('/applicationAnalytics/:id', {templateUrl: 'partials/applications/analyticsApp.html'})

  // Configuration -----------------------------------------------------------------------------------------------------
      // GENERAL
      .when('/configuration', {
          templateUrl: 'partials/configuration.html',
          controller : configurationCtrl,
          resolve : {
              configViews : function ($http) {
                  return $http.get(localStorage.baseURL+"management/configuration/views/",{
                      headers: {
                          'Authorization': 'Basic ' + localStorage.authorization
                      }
                  }).success(function (response) {
                      return response;
                  }).error(function () {
                      document.location.href="index.html";
                  });
              }
          }
      })

      // TAGS
      .when('/configurationTags', {
          templateUrl: 'partials/configuration/shardingTags.html',
          controller : configurationCtrlTags,
          resolve : {
              configTags : function ($http) {
                  return $http.get(localStorage.baseURL+"management/configuration/tags/",{
                      headers: {
                          'Authorization': 'Basic ' + localStorage.authorization
                      }
                  }).success(function (response) {
                      return response;
                  }).error(function () {
                      document.location.href="index.html";
                  });
              }
          }
      })

      // TENANTS
      .when('/configurationTenants', {
          templateUrl: 'partials/configuration/tenants.html',
          controller : configurationCtrlTenants,
          resolve : {
              configTenants : function ($http) {
                  return $http.get(localStorage.baseURL+"management/configuration/tenants/",{
                      headers: {
                          'Authorization': 'Basic ' + localStorage.authorization
                      }
                  }).success(function (response) {
                      return response;
                  }).error(function () {
                      document.location.href="index.html";
                  });
              }
          }
      })

      // GROUPS
      .when('/configurationGroups', {
          templateUrl: 'partials/configuration/groups.html',
          controller : configurationCtrlGroups,
          resolve : {
              configGroups : function ($http) {
                  return $http.get(localStorage.baseURL+"management/configuration/groups",{
                      headers: {
                          'Authorization': 'Basic ' + localStorage.authorization
                      }
                  }).success(function (response) {
                      return response;
                  }).error(function () {
                      document.location.href="index.html";
                  });
              }
          }
      })

  // Dashboard ---------------------------------------------------------------------------------------------------------
      .when('/dashboard', {templateUrl: 'partials/dashboard.html'})

  // Instances ---------------------------------------------------------------------------------------------------------
      // GENERAL
      .when('/instances', {
          templateUrl: 'partials/instances.html',
          controller : instanceCtrl,
          resolve : {
              instanceList : function ($http) {
                  return $http.get(localStorage.baseURL+"management/instances/?includeStopped=true",{
                      headers: {
                          'Authorization': 'Basic ' + localStorage.authorization
                      }
                  }).success(function (response) {
                      return response;
                  }).error(function () {
                      document.location.href="index.html";
                  });
              }
          }
      })

      .when('/instancesEnvironment/:event', {templateUrl: 'partials/instances/environmentInstance.html'})
      .when('/instancesMonitoring/:event', {templateUrl: 'partials/instances/monitoringInstance.html'})

  // Otherwise -- Default ----------------------------------------------------------------------------------------------
      .otherwise({redirectTo: 'apis'})
}) // End Routing

// SideNav Controller
app.controller('navCtrl', ['$scope','$http', function ($scope,$http) {

    /* SignOut */
    $scope.signOut = function () {
        $http.post(localStorage.baseURL+'management/user/logout',{
            headers: { 'Authorization': 'Basic ' + localStorage.authorization }
        }).success(function (response) {

            // reset values
            localStorage.username = '';
            localStorage.baseURL = '';
            localStorage.authorization = '';

            document.location.href="index.html";
        })
    }

    /* Authority */
    var authority = false;

    /* Username */
    $scope.username = localStorage.username;

    /* Environnment */
    $scope.environnment = localStorage.baseURL;

    /* Picture */
    $http.get(localStorage.baseURL+'management/user/'+localStorage.username+'/picture',{
        headers: { 'Authorization': 'Basic ' + localStorage.authorization }
    }).success(function (response) { $scope.img_profil = response; })

    /* Menu */
    var menuConfig = document.getElementById('menuConfiguration');
    var menuAPIs = document.getElementById('menuAPIs');
    var menuApplications = document.getElementById('menuApplications');
    var menuGateway = document.getElementById('menuInstances');

    // Buttons
    var buttonAPIs = document.getElementById('apis');
    var buttonApplications = document.getElementById('applications');
    var buttonInstances = document.getElementById('instances');
    var buttonDashboard = document.getElementById('dashboard');
    var buttonConfiguration = document.getElementById('configuration');

    // If i don't have authority
    if (authority === false){
        // chaching buttons
        buttonInstances.setAttribute('style','display: none');
        buttonDashboard.setAttribute('style','display: none');
        buttonConfiguration.setAttribute('style','display: none');
    }

    // default - color - Apis button
    buttonAPIs.setAttribute('style','background-color: rgba(0, 0, 0, 0.2);');

    // For reset menu
    function resetMenu() {

        // reset button
        buttonAPIs.setAttribute('style','background-color: white');
        buttonApplications.setAttribute('style','background-color: white');
        buttonInstances.setAttribute('style','background-color: white');
        buttonDashboard.setAttribute('style','background-color: white');
        buttonConfiguration.setAttribute('style','background-color: white');

        // verify authority
        if (authority === false){
            buttonInstances.setAttribute('style','display: none');
            buttonDashboard.setAttribute('style','display: none');
            buttonConfiguration.setAttribute('style','display: none');
        }

        menuConfig.setAttribute('style','display: none');
        menuAPIs.setAttribute('style','display: none');
        menuApplications.setAttribute('style','display: none');
        //menuGateway.setAttribute('style','display: none');
    }

    // for set color - button
    function color(button) {
        button.setAttribute('style','background-color: rgba(0, 0, 0, 0.2);');
    }

    // show Configuration Menu
    function showConfigurationMenu() {
        menuConfig.setAttribute('style','display: inline-block; width: 100%');
        color(buttonConfiguration);
    }

    // init - buttons
    function initButton() {
        // init with click action
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

    // url for test authority
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
}]); // navCtrl
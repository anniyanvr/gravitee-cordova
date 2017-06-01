/**
 * Created by Quentin on 11/04/2017.
 */


function apisCtrlGeneral($scope, $routeParams, $http) {

    var id = $routeParams.id;

    /* General */
    httpSuccessAPI = function (response) { $scope.rep = response; }

    /* Menu APIs management */
    var menuAPIs = document.getElementById('menuAPIs');
    menuAPIs.setAttribute('style', 'display: inline-block width: 100%');
    document.getElementById('menuAPIsGeneral').setAttribute('href','#/generalAPIs/'+id);
    document.getElementById('menuAPIsGateway').setAttribute('href','#/gatewayAPIs/'+id);
    document.getElementById('menuAPIsPlans').setAttribute('href','#/plansAPIs/'+id);
    document.getElementById('menuAPIsSubscription').setAttribute('href','#/subAPIs/'+id);
    document.getElementById('menuAPIsResources').setAttribute('href','#/resourcesAPIs/'+id);
    document.getElementById('menuAPIsPolicies').setAttribute('href','#/policiesAPIs/'+id);
    document.getElementById('menuAPIsMembers').setAttribute('href','#/membersAPIs/'+id);
    document.getElementById('menuAPIsProperties').setAttribute('href','#/propertiesAPIs/'+id);
    document.getElementById('menuAPIsAnalytics').setAttribute('href','#/analyticsAPIs/'+id);
    document.getElementById('menuAPIsHealthCheck').setAttribute('href','#/healthCheckAPI/'+id);
    document.getElementById('menuAPIsHistory').setAttribute('href','#/historyAPI/'+id);
    document.getElementById('menuAPIsEvents').setAttribute('href','#/eventsAPI/'+id);


    var api = localStorage.baseURL+"management/apis/"+id+"/"; // with login

    $http.get(api,{
        headers: {
            'Authorization': 'Basic ' + localStorage.authorization
        }
    }).success(httpSuccessAPI).error(function () {
        document.location.href="index.html";
    });
}
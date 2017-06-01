/**
 * Created by root on 11/05/17.
 */

function apisCtrlEvents($scope, $routeParams, $http){
    var id = $routeParams.id;

    httpSuccessAPIEvents = function (response) {
        $scope.rep = response;
        $scope.endpoints = response.proxy['endpoints'];
        $scope.loadB = response.proxy['load_balancing'];
    }
    httpSuccessEventsAll = function (response) { $scope.events = response; }

    var api = localStorage.baseURL+"management/apis/"+id+"/"; // with login
    var events = localStorage.baseURL+"management/apis/" +id + "/events?type=START_API,STOP_API";

    $http.get(api,{
        headers: {
            'Authorization': 'Basic ' + localStorage.authorization
        }
    }).success(httpSuccessAPIEvents).error(function () {
        document.location.href="index.html";
    });

    $http.get(events,{
        headers: {
            'Authorization': 'Basic ' + localStorage.authorization
        }
    }).success(httpSuccessEventsAll).error(function () {
        document.location.href="index.html";
    });
}
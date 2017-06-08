/**
 * Created by root on 11/05/17.
 */

function apisCtrlHistory($scope, $routeParams, $http) {

    var id = $routeParams.id;

    httpSuccessAPIHistory = function (response) {
        $scope.rep = response;
        $scope.endpoints = response.proxy['endpoints'];
        $scope.loadB = response.proxy['load_balancing'];
    }
    httpSuccessHistoryAll = function (response) {
        $scope.history = response;

        var responseParse = (JSON.parse(response[0].payload)).definition;
        $scope.responseParse = (JSON.parse(response[0].payload)).definition;
        console.log(responseParse);
    }

    var api = localStorage.baseURL+"management/apis/"+id+"/"; // with login
    var history = localStorage.baseURL + "management/apis/" +id + "/events?type=PUBLISH_API";

    /* General */
    $http.get(api,{
        headers: {
            //'Authorization': 'Basic ' + encode(localStorage.username+':'+localStorage.password)
            'Authorization': 'Basic ' + localStorage.authorization
        }
    }).success(httpSuccessAPIHistory).error(function () {
        document.location.href="index.html";
    });

    /* History */
    $http.get(history,{
        headers: {
            //'Authorization': 'Basic ' + encode(localStorage.username+':'+localStorage.password)
            'Authorization': 'Basic ' + localStorage.authorization
        }
    }).success(httpSuccessHistoryAll).error(function () {
        document.location.href="index.html";
    });
}
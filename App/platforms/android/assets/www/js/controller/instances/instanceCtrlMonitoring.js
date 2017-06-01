/**
 * Created by root on 04/05/17.
 */

function instanceCtrlMonitoring($scope, $routeParams, $http) {

    var event = $routeParams.event;

    // functions
    httpSuccessInstancesMonitoringResponse = function(response){
        $scope.monitoring = response;
        console.log(response.cpu["percent_use"]);
    }

    httpSuccessInstancesMonitoring = function (response) {
        var id = response.id;

        var monitoringUrl = localStorage.baseURL + "management/instances/" + event + "/monitoring/" + id;

        $http.get(monitoringUrl,{
            headers: {
                'Authorization': 'Basic ' + localStorage.authorization
            }
        }).success(httpSuccessInstancesMonitoringResponse).error(function () {
            document.location.href="index.html";
        });
    }

    // url
    var instances = localStorage.baseURL+"management/instances/"+event; // with login

    // url processing
    $http.get(instances,{
        headers: {
            'Authorization': 'Basic ' + localStorage.authorization
        }
    }).success(httpSuccessInstancesMonitoring).error(function () {
        document.location.href="index.html";
    });
}
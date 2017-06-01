/**
 * Created by root on 26/04/17.
 */

function instanceCtrlEnvironment($scope, $routeParams, $http) {

    /* for instance menu */
    var event = $routeParams.event;
    var menuInstances = document.getElementById('menuInstances');
    menuInstances.setAttribute('style', 'display: inline-block width: 100%');
    document.getElementById('menuInstancesEnvironment').setAttribute('href','#/instancesEnvironment/'+event);
    document.getElementById('menuInstancesMonitoring').setAttribute('href','#/instancesMonitoring/'+event);

    /* for scope */
    //    var constant = localStorage.baseURL + "constants.json";

    httpSuccessInstances = function (response) {
        $scope.rep = response;
        $scope.plugins = response.plugins;
        $scope.systemProperties = response.systemProperties;
        console.log(response.systemProperties);
    }

    var instances = localStorage.baseURL+"management/instances/"+event; // with login

    $http.get(instances,{
        headers: {
            'Authorization': 'Basic ' + localStorage.authorization
        }
    }).success(httpSuccessInstances).error(function () {
        document.location.href="index.html";
    });
}
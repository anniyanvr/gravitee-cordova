/**
 * Created by Quentin on 06/04/2017.
 */

function instanceCtrl($scope, $http) {

    // set instancesShow - default
    $scope.instancesShow = 'false';

    httpSuccessAllInstances = function (response) {
        console.log(response);

        if (response.length !== 0){
            $scope.instancesShow = 'true';
        }

        $scope.rep = response;
    }

    var instancesAll = localStorage.baseURL+"management/instances/?includeStopped=true"; // with login

    $http.get(instancesAll,{
        headers: {
            'Authorization': 'Basic ' + localStorage.authorization
        }
    }).success(httpSuccessAllInstances).error(function () {
        document.location.href="index.html";
    });
}
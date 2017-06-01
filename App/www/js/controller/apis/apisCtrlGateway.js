/**
 * Created by Quentin on 24/04/2017.
 */

function apisCtrlGateway($scope, $routeParams, $http) {
    var id = $routeParams.id;

    httpSuccessAPIGateway = function (response) {
        $scope.rep = response;
        $scope.endpoints = response.proxy['endpoints'];
        $scope.loadB = response.proxy['load_balancing'];
    }

    var api = localStorage.baseURL+"management/apis/"+id+"/"; // with login

    $http.get(api,{
        headers: {
            'Authorization': 'Basic ' + localStorage.authorization
        }
    }).success(httpSuccessAPIGateway).error(function () {
        document.location.href="index.html";
    });
}
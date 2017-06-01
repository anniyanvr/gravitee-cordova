/**
 * Created by root on 16/05/17.
 */

function apisCtrlResources($scope, $routeParams, $http) {
    var id = $routeParams.id;

    httpSuccessAPIRes = function (response) {
        $scope.rep = response;
        $scope.resources = response.resources;
    }

    var api = localStorage.baseURL+"management/apis/"+id+"/"; // with login

    $http.get(api,{
        headers: {
            'Authorization': 'Basic ' + localStorage.authorization
        }
    }).success(httpSuccessAPIRes).error(function () {
        document.location.href="index.html";
    });
}
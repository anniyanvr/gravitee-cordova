/**
 * Created by root on 26/06/17.
 */

function apisCtrlDocumentation ($scope, $routeParams, $http) {
    var id = $routeParams.id;

    httpSuccessAPIDoc = function (response) { $scope.rep = response; }
    httpSuccessAPIDocPages = function (response) { $scope.repPages = response; }

    $scope.Showcontent = function (idPages) {
        $http.get(localStorage.baseURL+"management/apis/"+id+"/pages/"+idPages,{
            headers: {
                'Authorization': 'Basic ' + localStorage.authorization
            }
        }).success(httpSuccessAPIDocPages).error(function () {
            document.location.href="index.html";
        });
    }

    var apiDoc = localStorage.baseURL+"management/apis/"+id+"/pages/"; // with login

    $http.get(apiDoc,{
        headers: {
            'Authorization': 'Basic ' + localStorage.authorization
        }
    }).success(httpSuccessAPIDoc).error(function () {
        document.location.href="index.html";
    });
}
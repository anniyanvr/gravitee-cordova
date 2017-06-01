/**
 * Created by root on 16/05/17.
 */

function apisCtrlMembers($scope, $routeParams, $http) {
    var id = $routeParams.id;

    /* functions */
    httpSuccessAPIMem = function (response) { $scope.rep = response; }
    httpSuccessAPIMembers = function (response) { $scope.members = response; }

    /* URLs */
    var api = localStorage.baseURL+"management/apis/"+id+"/"; // with login
    var members = localStorage.baseURL+"management/apis/"+id+"/members/"; // with login

    /* URLs Management */
    $http.get(api,{
        headers: {
            'Authorization': 'Basic ' + localStorage.authorization
        }
    }).success(httpSuccessAPIMem).error(function () {
        document.location.href="index.html";
    });

    $http.get(members,{
        headers: {
            'Authorization': 'Basic ' + localStorage.authorization
        }
    }).success(httpSuccessAPIMembers).error(function () {
        document.location.href="index.html";
    });
}
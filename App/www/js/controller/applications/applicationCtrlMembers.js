/**
 * Created by root on 16/05/17.
 */

function applicationCtrlMembers($scope, $routeParams, $http) {
    var id = $routeParams.id;

    // functions
    httpSuccessApplication = function (response) { $scope.rep = response; }
    httpSuccessApplicationMembers = function (response) { $scope.members = response; }

    // urls
    var app = localStorage.baseURL+"management/applications/"+id+"/"; // with login
    var appMembers = localStorage.baseURL+"management/applications/"+id+"/members"; // with login

    // URLs processing
    $http.get(app,{
        headers: {
            'Authorization': 'Basic ' + localStorage.authorization
        }
    }).success(httpSuccessApplication).error(function () {
        document.location.href="index.html";
    });

    $http.get(appMembers,{
        headers: {
            'Authorization': 'Basic ' + localStorage.authorization
        }
    }).success(httpSuccessApplicationMembers).error(function () {
        document.location.href="index.html";
    });
}
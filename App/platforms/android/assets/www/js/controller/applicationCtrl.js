/**
 * Created by Quentin on 06/04/2017.
 */

function applicationCtrl($scope, $http) {

    httpSuccessAllApplications = function (response) {
        $scope.rep = response;
    }

    var applicationsAll = localStorage.baseURL+"management/applications/"; // with login

    $http.get(applicationsAll,{
        headers: {
            'Authorization': 'Basic ' + localStorage.authorization
        }
    }).success(httpSuccessAllApplications).error(function () {
        document.location.href="index.html";
    });
}
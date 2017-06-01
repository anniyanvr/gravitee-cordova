/**
 * Created by Quentin on 20/04/2017.
 */

function configurationCtrl($scope, $http) {

    httpSuccessConfiguration = function (response) {
        console.log(response);
        $scope.rep = response;
    }

    var configurationAll = localStorage.baseURL+"management/configuration/views/"; // with login

    $http.get(configurationAll,{
        headers: {
            'Authorization': 'Basic ' + localStorage.authorization
        }
    }).success(httpSuccessConfiguration).error(function () {
        document.location.href="index.html";
    });
}
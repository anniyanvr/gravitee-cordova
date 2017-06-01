/**
 * Created by root on 25/04/17.
 */

function configurationCtrlTags($scope, $http) {

    httpSuccessConfigurationTags = function (response) {
        console.log(response);
        $scope.rep = response;
    }

    var configurationTenants = localStorage.baseURL+"management/configuration/tags/"; // with login

    $http.get(configurationTenants,{
        headers: {
            'Authorization': 'Basic ' + localStorage.authorization
        }
    }).success(httpSuccessConfigurationTags).error(function () {
        document.location.href="index.html";
    });
}
/**
 * Created by root on 25/04/17.
 */

function configurationCtrlTenants($scope, $http) {

    httpSuccessConfigurationTenants = function (response) {
        console.log(response);
        $scope.rep = response;
    }

    var configurationTenants = localStorage.baseURL+"management/configuration/tenants/"; // with login

    $http.get(configurationTenants,{
        headers: {
            'Authorization': 'Basic ' + localStorage.authorization
        }
    }).success(httpSuccessConfigurationTenants).error(function () {
        document.location.href="index.html";
    });
}
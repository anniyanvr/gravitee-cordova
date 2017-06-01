/**
 * Created by root on 09/05/17.
 */

function apisCtrlPolicies($scope, $routeParams, $http) {
    var id = $routeParams.id;

    httpSuccessAPIPolicies = function (response) { $scope.rep = response; }
    httpSuccessAPIPoliciesAll = function (response) { $scope.policies = response; }

    var api = localStorage.baseURL+"management/apis/"+id+"/"; // with login

    $http.get(api,{
        headers: {
            'Authorization': 'Basic ' + localStorage.authorization
        }
    }).success(httpSuccessAPIPolicies).error(function () {
        document.location.href="index.html";
    });

    $http.get(localStorage.baseURL + "management/policies/",{
        headers: {
            'Authorization': 'Basic ' + localStorage.authorization
        }
    }).success(httpSuccessAPIPoliciesAll).error(function () {
        document.location.href="index.html";
    });
}
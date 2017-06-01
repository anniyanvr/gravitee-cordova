/**
 * Created by root on 17/05/17.
 */

function apisCtrlSubscription($scope, $routeParams, $http) {
    var id = $routeParams.id;

    httpSuccessAPI = function (response) { $scope.rep = response; $scope.statusShow = "accepted";}
    httpSuccessAPISubscription = function (response) { $scope.subscription = response; }

    var api = localStorage.baseURL+"management/apis/"+id+"/"; // with login
    var apiSub = localStorage.baseURL+"management/apis/"+id+"/subscriptions"; // with login

    $http.get(api,{
        headers: {
            'Authorization': 'Basic ' + localStorage.authorization
        }
    }).success(httpSuccessAPI).error(function () {
        document.location.href="index.html";
    });

    $http.get(apiSub,{
        headers: {
            'Authorization': 'Basic ' + localStorage.authorization
        }
    }).success(httpSuccessAPISubscription).error(function () {
        document.location.href="index.html";
    });

    $scope.changeSub = function () {
        var selectElmt = document.getElementById('select_sub');
        var value = selectElmt.options[selectElmt.selectedIndex].value;
        $scope.statusShow = value;
    }
}
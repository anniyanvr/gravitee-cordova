/**
 * Created by root on 17/05/17.
 */

function applicationCtrlSubscription($scope, $routeParams, $http) {
    var id = $routeParams.id;

    // functions
    httpSuccessApplication = function (response) { $scope.rep = response; $scope.statusShow = "accepted";}
    httpSuccessApplicationSubscription = function (response) { $scope.subscription = response; }

    // urls
    var app = localStorage.baseURL+"management/applications/"+id+"/"; // with login
    var appSub = localStorage.baseURL+"management/applications/"+id+"/subscriptions"; // with login

    // URLs processing
    $http.get(app,{
        headers: {
            'Authorization': 'Basic ' + localStorage.authorization
        }
    }).success(httpSuccessApplication).error(function () {
        document.location.href="index.html";
    });

    $http.get(appSub,{
        headers: {
            'Authorization': 'Basic ' + localStorage.authorization
        }
    }).success(httpSuccessApplicationSubscription).error(function () {
        document.location.href="index.html";
    });

    // changeSubcription
    $scope.changeSub = function () {
        var selectElmt = document.getElementById('select_sub');
        var value = selectElmt.options[selectElmt.selectedIndex].value;
        $scope.statusShow = value;
    }
}
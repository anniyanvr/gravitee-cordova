/**
 * Created by root on 17/05/17.
 */

function apisCtrlSubscription($scope, $routeParams, $http) {
    var id = $routeParams.id;

    httpSuccessAPI = function (response) { $scope.rep = response; $scope.statusShow = "accepted";}
    httpSuccessAPISubscription = function (response) { $scope.subscription = response; }
    httpSuccessAPIKeys = function ( response ) {
        Materialize.toast( response[0].key, 6000, 'rounded') // 'rounded' is the class I'm applying to the toast
    }
    
    var api = localStorage.baseURL+"management/apis/"+id+"/"; // with login
    var apiSub = localStorage.baseURL+"management/apis/"+id+"/subscriptions"; // with login
    
    $scope.ShowKey = function (sub_id) {
        var apiSubKey = localStorage.baseURL+"management/apis/"+id+"/subscriptions/"+sub_id+"/keys";
        $http.get(apiSubKey,{
            headers: {
                'Authorization': 'Basic ' + localStorage.authorization
            }
        }).success(httpSuccessAPIKeys).error(function () {
            document.location.href="index.html";
        }); 
    }
    
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
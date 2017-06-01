/**
 * Created by root on 09/05/17.
 */

function apisCtrlPlans($scope, $routeParams, $http) {
    var id = $routeParams.id;

    /* functions */
    httpSuccessAPIPlans = function (response) { $scope.rep = response; }
    httpSuccessChangeStatus = function (response) { $scope.status = response; }

    // url
    var api = localStorage.baseURL+"management/apis/"+id+"/"; // with login

    // URLs Management
    $http.get(api,{
        headers: {
            'Authorization': 'Basic ' + localStorage.authorization
        }
    }).success(httpSuccessAPIPlans).error(function () {
        document.location.href="index.html";
    });

    $http.get(localStorage.baseURL + "management/apis/" + id + "/plans?status=published",{
        headers: {
            'Authorization': 'Basic ' + localStorage.authorization
        }
    }).success(httpSuccessChangeStatus).error(function () {
        document.location.href="index.html";
    });

    /* change Status */
    $scope.changeStatus = function () {
        var selectElmt = document.getElementById('selectStatus');
        var value = selectElmt.options[selectElmt.selectedIndex].value;

        $http.get(localStorage.baseURL + "management/apis/" + id + "/plans?status=" + value, {
            headers: {
                'Authorization': 'Basic ' + localStorage.authorization
            }
        }).success(httpSuccessChangeStatus).error(function () {
            document.location.href = "index.html";
        });
    }
}
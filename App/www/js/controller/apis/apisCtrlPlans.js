/**
 * Created by root on 09/05/17.
 */

function apisCtrlPlans($scope, $http, myApiPlans, myApiPlansStatus) {

    /* -- RESOLVE -- */
    var id = myApiPlans.data.id;
    $scope.rep = myApiPlans.data;
    $scope.status = myApiPlansStatus.data;

    httpSuccessChangeStatus = function (response) { $scope.status = response; }

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
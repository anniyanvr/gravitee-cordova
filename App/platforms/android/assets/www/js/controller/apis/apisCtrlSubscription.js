/**
 * Created by root on 17/05/17.
 */

function apisCtrlSubscription($scope, $http, myApiInfo, myApiSub) {
    var id = myApiInfo.data.id;

    /* -- RESOLVE -- */
    $scope.rep = myApiInfo.data;
    $scope.statusShow = "accepted";

    $scope.subscription = myApiSub.data;

    // -- APIKeys --
    httpSuccessAPIKeys = function ( response ) {
        Materialize.toast( response[0].key, 6000, 'rounded') // 'rounded' is the class I'm applying to the toast
    }

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


    $scope.changeSub = function () {
        var selectElmt = document.getElementById('select_sub');
        var value = selectElmt.options[selectElmt.selectedIndex].value;
        $scope.statusShow = value;
    }
}
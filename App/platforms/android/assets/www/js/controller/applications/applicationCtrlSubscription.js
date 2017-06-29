/**
 * Created by root on 17/05/17.
 */

function applicationCtrlSubscription($scope, applicationSubGeneral, applicationSub) {

    /* -- RESOLVE -- */

    // general
    $scope.rep = applicationSubGeneral.data;
    $scope.statusShow = "accepted";

    // subscription
    $scope.subscription = applicationSub.data;

    // changeSubcription
    $scope.changeSub = function () {
        var selectElmt = document.getElementById('select_sub');
        var value = selectElmt.options[selectElmt.selectedIndex].value;
        $scope.statusShow = value;
    }
}
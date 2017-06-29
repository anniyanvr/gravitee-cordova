/**
 * Created by root on 22/05/17.
 */

function configurationCtrlGroups($scope, $http, configGroups) {

    /* -- RESOLVE -- */
    $scope.rep = configGroups.data;

    // set default style for apiShow
    document.getElementById('apiShow').setAttribute('style','display: none');

    /* Select Management */
    $scope.selectGroup = function () {
        var selectElmt = document.getElementById('selectGroup');
        var value = selectElmt.options[selectElmt.selectedIndex].value;
        document.getElementById('applicationShow').setAttribute('style','display: none');
        document.getElementById('apiShow').setAttribute('style','display: none');
        if (value === 'application'){ document.getElementById('applicationShow').removeAttribute('style'); }
        if (value === 'api'){ document.getElementById('apiShow').removeAttribute('style'); }
    }

}
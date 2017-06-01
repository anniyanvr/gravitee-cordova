/**
 * Created by root on 22/05/17.
 */

function configurationCtrlGroups($scope, $http) {

    // set default style for apiShow
    document.getElementById('apiShow').setAttribute('style','display: none');

    httpSuccessConfigurationGroups = function (response) {
        console.log(response);
        $scope.rep = response;
    }

    /* Select Management */
    $scope.selectGroup = function () {
        var selectElmt = document.getElementById('selectGroup');
        var value = selectElmt.options[selectElmt.selectedIndex].value;
        document.getElementById('applicationShow').setAttribute('style','display: none');
        document.getElementById('apiShow').setAttribute('style','display: none');
        if (value === 'application'){ document.getElementById('applicationShow').removeAttribute('style'); }
        if (value === 'api'){ document.getElementById('apiShow').removeAttribute('style'); }
    }

    // url
    var configurationGroups = localStorage.baseURL+"management/configuration/groups"; // with login

    // url processing
    $http.get(configurationGroups,{
        headers: {
            'Authorization': 'Basic ' + localStorage.authorization
        }
    }).success(httpSuccessConfigurationGroups).error(function () {
        document.location.href="index.html";
    });
}
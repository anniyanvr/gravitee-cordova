/**
 * Created by root on 28/04/17.
 */

function applicationCtrlGlobalSettings($scope, $routeParams, $http) {
    var id = $routeParams.id;

    var menuApplications = document.getElementById('menuApplications');
    menuApplications.setAttribute('style', 'display: inline-block width: 100%');
    document.getElementById('applicationGlobalSettings').setAttribute('href','#/applicationGlobalSettings/'+id);
    document.getElementById('applicationAnalytics').setAttribute('href','#/applicationAnalytics/'+id);
}
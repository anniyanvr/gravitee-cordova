/**
 * Created by root on 28/04/17.
 */

function applicationCtrlGlobalSettings($scope, applicationGeneral) {

    /* -- RESOLVE -- */
    var id = applicationGeneral.data.id;
    $scope.rep = applicationGeneral.data;

    /* Menu Applications Management */
    var menuApplications = document.getElementById('menuApplications');
    menuApplications.setAttribute('style', 'display: inline-block width: 100%');
    document.getElementById('applicationGlobalSettings').setAttribute('href','#/applicationGlobalSettings/'+id);
    document.getElementById('applicationAnalytics').setAttribute('href','#/applicationAnalytics/'+id);
    document.getElementById('applicationMembers').setAttribute('href','#/applicationMembers/'+id);
    document.getElementById('applicationSubscription').setAttribute('href','#/applicationSubscription/'+id);

}
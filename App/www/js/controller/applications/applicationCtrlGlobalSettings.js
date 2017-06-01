/**
 * Created by root on 28/04/17.
 */

function applicationCtrlGlobalSettings($scope, $routeParams, $http) {
    var id = $routeParams.id;

    httpSuccessApplication = function (response) { $scope.rep = response; }

    /* Menu Applications Management */
    var menuApplications = document.getElementById('menuApplications');
    menuApplications.setAttribute('style', 'display: inline-block width: 100%');
    document.getElementById('applicationGlobalSettings').setAttribute('href','#/applicationGlobalSettings/'+id);
    document.getElementById('applicationAnalytics').setAttribute('href','#/applicationAnalytics/'+id);
    document.getElementById('applicationMembers').setAttribute('href','#/applicationMembers/'+id);
    document.getElementById('applicationSubscription').setAttribute('href','#/applicationSubscription/'+id);

    var app = localStorage.baseURL+"management/applications/"+id+"/"; // with login

    $http.get(app,{
        headers: {
            'Authorization': 'Basic ' + localStorage.authorization
        }
    }).success(httpSuccessApplication).error(function () {
        document.location.href="index.html";
    });
}
/**
 * Created by root on 16/05/17.
 */

function apisCtrlMembers($scope, $http, myApiMembersInfo, myApiMembers) {

    /* -- RESOLVE -- */
    $scope.rep = myApiMembersInfo.data;
    $scope.members = myApiMembers.data;

}
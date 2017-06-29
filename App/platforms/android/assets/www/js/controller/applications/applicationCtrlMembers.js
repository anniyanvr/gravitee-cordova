/**
 * Created by root on 16/05/17.
 */

function applicationCtrlMembers($scope, applicationMembersGeneral, appliMembers) {

    $scope.rep = applicationMembersGeneral.data;
    $scope.members = appliMembers.data;

}
/**
 * Created by Quentin on 06/04/2017.
 */

function instanceCtrl($scope, instanceList) {

    // set instancesShow - default
    $scope.instancesShow = 'false';

    /* -- RESOLVE -- */
    $scope.rep = instanceList.data;

    if (instanceList.data.length !== 0) {
        $scope.instancesShow = 'true';
    }

}
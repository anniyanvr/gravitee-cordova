/**
 * Created by root on 16/05/17.
 */

function apisCtrlResources($scope, myApiResource) {

    /* -- RESOLVE -- */
    $scope.rep = myApiResource.data;
    $scope.resources = myApiResource.data.resources;

}
/**
 * Created by Quentin on 24/04/2017.
 */

function apisCtrlGateway($scope, myApiGateway) {

    $scope.rep = myApiGateway.data;
    $scope.endpoints = myApiGateway.data.proxy['endpoints'];
    $scope.loadB = myApiGateway.data.proxy['load_balancing'];

}
/**
 * Created by root on 11/05/17.
 */

function apisCtrlEvents($scope, myApiEventsInfos, myApiEvents){

    /* -- RESOLVE -- */

    // Infos
    $scope.rep = myApiEventsInfos.data;
    $scope.endpoints = myApiEventsInfos.data.proxy['endpoints'];
    $scope.loadB = myApiEventsInfos.data.proxy['load_balancing'];

    // Events
    $scope.events = myApiEvents.data;

}
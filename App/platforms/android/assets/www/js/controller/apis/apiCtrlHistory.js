/**
 * Created by root on 11/05/17.
 */

function apisCtrlHistory($scope, myApiHistoInfo, myApiHistory) {

    /* -- RESOLVE -- */

    // Infos
    $scope.rep = myApiHistoInfo.data;
    $scope.endpoints = myApiHistoInfo.data.proxy['endpoints'];
    $scope.loadB = myApiHistoInfo.data.proxy['load_balancing'];

    // History
    $scope.history = myApiHistory.data;
    var tab = [];
    for (var i=0;i<myApiHistory.data.length;i++){
        tab.push((JSON.parse(myApiHistory.data[i].payload)).definition);
    }
    $scope.responseParse = tab;

}
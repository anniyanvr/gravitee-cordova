/**
 * Created by root on 02/05/17.
 */

var settings = angular.module('settings', [])

settings.controller('settingsCtrl', ['$scope',
    function($scope)
    {
        var tabEnvironment = [localStorage.tabEnvironment];

        $scope.submitFormSettings = function(){
            tabEnvironment.push($scope.environment);
            $scope.environment = "";

            localStorage.setItem("tabEnvironment",(JSON.stringify(tabEnvironment)));
            var obj = JSON.parse(localStorage.tabEnvironment);
            console.log(typeof obj);

            console.log(obj[2]);
        }
    }
]);
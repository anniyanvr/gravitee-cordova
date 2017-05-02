/**
 * Created by root on 02/05/17.
 */

var settings = angular.module('settings', [])

settings.controller('settingsCtrl', ['$scope',
    function($scope)
    {
        var tabEnvironment = [localStorage.tabEnvironment];

        console.log(localStorage.tabEnvironment.length);

        $scope.submitFormSettings = function(){
            tabEnvironment.push($scope.environment);
            $scope.environment = "";
            localStorage.setItem("tabEnvironment",tabEnvironment);
            console.log(localStorage.tabEnvironment);
        }
    }
]);
/**
 * Created by root on 02/05/17.
 */

var settings = angular.module('settings', [])

settings.controller('settingsCtrl', ['$scope',
    function($scope)
    {

        var tabEnvironment;
        var showEnv = document.getElementById('showEnv');

        if ((typeof (localStorage.tabEnvironment)) !== "undefined"){
            var obj = JSON.parse(localStorage.tabEnvironment);
            tabEnvironment = obj;
            console.log(typeof obj);
            console.log(obj);
            for (var i=0;i<obj.length;i++){
                var span = document.createElement('span');
                span.innerHTML = obj[i] + "<br/>";
                showEnv.appendChild(span);
            }
        }
        else{
            tabEnvironment = [];
        }


        $scope.submitFormSettings = function(){
            tabEnvironment.push($scope.environment);
            $scope.environment = "";

            localStorage.setItem("tabEnvironment",(JSON.stringify(tabEnvironment)));
//            var obj = JSON.parse(localStorage.tabEnvironment);
//            console.log(typeof obj);

//            console.log(obj[2]);
        }
    }
]);
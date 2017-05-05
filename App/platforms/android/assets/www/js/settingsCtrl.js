/**
 * Created by root on 02/05/17.
 */

var settings = angular.module('settings', [])

settings.controller('settingsCtrl', ['$scope',
    function($scope)
    {

        var tabEnvironment;
        var showEnv = document.getElementById('showEnv');

        deleteEnv = function (i) {
            var obj = JSON.parse(localStorage.tabEnvironment);
            console.log(i);
            obj.splice(i,1);
            tabEnvironment = obj;
            localStorage.setItem("tabEnvironment",(JSON.stringify(tabEnvironment)));
            location.reload();
        }

        if ((typeof (localStorage.tabEnvironment)) !== "undefined"){
            var obj = JSON.parse(localStorage.tabEnvironment);
            //obj.splice(0,1)
            tabEnvironment = obj;
            //localStorage.setItem("tabEnvironment",(JSON.stringify(tabEnvironment)));
            console.log(typeof obj);
            console.log(obj);
            for (var i=0;i<obj.length;i++){
                var span = document.createElement('span');

                console.log(i);

                span.innerHTML =
                    "<table class='striped'>" +
                    "   <tr class='number'>" +
                    "       <td style='padding-left: 15px; font-size: small; width: 100%'>" + obj[i] + "<td>" +
                    "       <!-- <td style='cursor: pointer; padding-right: 15px; text-align: right; width: 20%'>" +
                    "           <i class='material-icons'>edit</i>" +
                    "       </td> -->" +
                    "       <td onclick='deleteEnv("+i+")' style='cursor: pointer; padding-right: 15px; text-align: right; width: 20%'>" +
                    "           <i class='material-icons'>delete</i>" +
                    "       </td>" +
                    "   </tr>" +
                    "</table>";
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
            location.reload();
            //            var obj = JSON.parse(localStorage.tabEnvironment);
            //            console.log(typeof obj);
            //            console.log(obj[2]);
        }
    }
]);
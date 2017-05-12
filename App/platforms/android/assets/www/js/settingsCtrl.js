/**
 * Created by root on 02/05/17.
 */

var settings = angular.module('settings', [])

settings.controller('settingsCtrl', ['$scope',
    function($scope)
    {

        var tabEnvironment;
        var showEnv = document.getElementById('showEnv');

        // delete Environment
        deleteEnv = function (i) {
            var obj = JSON.parse(localStorage.tabEnvironment);
            console.log(i);
            obj.splice(i,1);
            tabEnvironment = obj;
            localStorage.setItem("tabEnvironment",(JSON.stringify(tabEnvironment)));
            location.reload();
        }

        // edit Environment
        var tempo;
        editEnv = function (i) {
            tempo = 0;
            tempo = i;
            var obj = JSON.parse(localStorage.tabEnvironment);
            $scope.environmentEditInput = obj[i];
            document.getElementById('modalEdit').setAttribute('style','top:60px; bottom:50px; display:inline-block; z-index:1');
        }

        $scope.submitFormEdit = function () {
            console.log(tempo);
            var obj = JSON.parse(localStorage.tabEnvironment);
            if($scope.environmentEdit[$scope.environmentEdit.length-1] === '/'){
                obj.splice(tempo,1,$scope.environmentEdit);
            }
            else{
                var env = $scope.environmentEdit+'/';
                obj.splice(tempo,1,env);
            }
            console.log(obj);
            tabEnvironment = obj;
            localStorage.setItem("tabEnvironment",(JSON.stringify(tabEnvironment)));
            location.reload();
            $scope.environmentEdit ="";
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
                    "   <tr>" +
                    "       <td id='input"+i+"' style='padding-left: 15px; font-size: small; width: 100%'> " +
                    "           <input style=' color: #000;' value='"+obj[i]+"' disabled><td>" +
                    "       <td onclick='editEnv("+i+")' style='cursor: pointer; padding-right: 15px; text-align: right; width: 20%'>" +
                    "           <i class='material-icons'>edit</i>" +
                    "       </td>" +
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
            if($scope.environment[$scope.environment.length-1] === '/'){
                tabEnvironment.push($scope.environment);
            }
            else{
                var environment = $scope.environment+'/';
                tabEnvironment.push(environment);
            }

            $scope.environment = "";

            localStorage.setItem("tabEnvironment",(JSON.stringify(tabEnvironment)));
            location.reload();
            //            var obj = JSON.parse(localStorage.tabEnvironment);
            //            console.log(typeof obj);
            //            console.log(obj[2]);
        }
    }
]);
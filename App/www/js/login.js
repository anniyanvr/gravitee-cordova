/**
 * Created by Quentin on 18/04/2017.
 */

var login = angular.module('login', []);

login.config(['$httpProvider', function($httpProvider) {
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common["X-Requested-With"];
}]);

login.controller('loginCtrl', ['$scope','$http',
            function($scope,$http)
{
    if (localStorage.username !== '' && localStorage.baseURL !== '' && localStorage.authorization !== ''){
        document.location.href="loginAccept.html";
    }

    var loader = document.getElementById('loader');
    var selectEnvironment = document.getElementById('selectEnvironment');

    if ((typeof (localStorage.tabEnvironment)) !== "undefined"){
        var obj = JSON.parse(localStorage.tabEnvironment);
        for (var i=0;i<obj.length;i++){
            var option = document.createElement('option');

            option.innerHTML =
                "<option>" + obj[i] + "</option>";
            selectEnvironment.appendChild(option);
        }
    }

    $scope.submitFormLogin = function () {
        loader.setAttribute('style','display: inline-block');

        var selectElmt = document.getElementById('selectEnvironment');
        var baseURL = selectElmt.options[selectElmt.selectedIndex].text;

        var url = baseURL + "management/user/login";

        var username = $scope.username;
        var password = $scope.password;

        $http.defaults.headers.post.Authorization = 'Basic ' + encode(username+':'+password);
        $http.post(url, {
            headers: {'Authorization': 'Basic ' + encode(username+':'+password)}
        }).success(function () {

            localStorage.setItem("username",username);
            localStorage.setItem("baseURL",baseURL);

            localStorage.setItem("authorization",encode(username+':'+password));

            loader.setAttribute('style','display: none');
           document.location.href="loginAccept.html";
        }).error(function (status) {
            loader.setAttribute('style','display: none');
            $scope.errorShow = 'Please verify your informations';
        })
    }

    // permet d'encoder en base64
    var keyStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
    function encode(input) {
        var output = "";
        var chr1, chr2, chr3 = "";
        var enc1, enc2, enc3, enc4 = "";
        var i = 0;

        do {
            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);

            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;

            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            } else if (isNaN(chr3)) {
                enc4 = 64;
            }

            output = output +
                keyStr.charAt(enc1) +
                keyStr.charAt(enc2) +
                keyStr.charAt(enc3) +
                keyStr.charAt(enc4);
            chr1 = chr2 = chr3 = "";
            enc1 = enc2 = enc3 = enc4 = "";
        } while (i < input.length);

        return output;
    }
}]);
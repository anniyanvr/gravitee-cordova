/**
 * Created by root on 17/05/17.
 */

function applicationCtrlSubscription($scope, $routeParams, $http) {
    var id = $routeParams.id;

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

    // functions
    httpSuccessApplication = function (response) { $scope.rep = response; $scope.statusShow = "accepted";}
    httpSuccessApplicationSubscription = function (response) { $scope.subscription = response; }

    // urls
    var app = localStorage.baseURL+"management/applications/"+id+"/"; // with login
    var appSub = localStorage.baseURL+"management/applications/"+id+"/subscriptions"; // with login

    // URLs processing
    $http.get(app,{
        headers: {'Authorization': 'Basic ' + encode(localStorage.username+':'+localStorage.password)}
    }).success(httpSuccessApplication).error(function () {
        document.location.href="index.html";
    });

    $http.get(appSub,{
        headers: {'Authorization': 'Basic ' + encode(localStorage.username+':'+localStorage.password)}
    }).success(httpSuccessApplicationSubscription).error(function () {
        document.location.href="index.html";
    });

    // changeSubcription
    $scope.changeSub = function () {
        var selectElmt = document.getElementById('select_sub');
        var value = selectElmt.options[selectElmt.selectedIndex].value;
        $scope.statusShow = value;
    }
}
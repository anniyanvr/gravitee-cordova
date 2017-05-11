/**
 * Created by root on 11/05/17.
 */

function apisCtrlEvents($scope, $routeParams, $http){
    var id = $routeParams.id;
    // console.log("id : "+$routeParams.id);

    var constant = localStorage.baseURL+"constants.json";

    httpSuccessAPIEvents = function (response) {
        $scope.rep = response;
        $scope.endpoints = response.proxy['endpoints'];
        $scope.loadB = response.proxy['load_balancing'];
    }
    httpSuccessEventsAll = function (response) { $scope.events = response; }

    $http.get(constant).success(function (response) {

        var api = response["baseURL"]+"apis/"+id+"/"; // with login
        var events = response["baseURL"] + "apis/" +id + "/events?type=START_API,STOP_API";

        $http.get(api,{
            headers: {'Authorization': 'Basic ' + encode(localStorage.username+':'+localStorage.password)}
        }).success(httpSuccessAPIEvents).error(function () {
            document.location.href="index.html";
        });

        $http.get(events,{
            headers: {'Authorization': 'Basic ' + encode(localStorage.username+':'+localStorage.password)}
        }).success(httpSuccessEventsAll).error(function () {
            document.location.href="index.html";
        });
    });

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
}
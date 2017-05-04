/**
 * Created by root on 28/04/17.
 */

function applicationCtrlAnalytics($scope, $routeParams, $http) {
    var id = $routeParams.id;
    var constant = localStorage.baseURL+"constants.json";

    // this is a test for cache
    // console.log("test for cache");

    httpSuccessApplicationAnalytics = function (response) { $scope.rep = response; }
    httpSuccessApplicationTopAPI = function (response) {
        if(typeof (response.value) === 'undefined')
            $scope.showTopAPIs = 'false';
        else {
            $scope.apis = response;
            $scope.showTopAPIs = 'true';
        }
    }
    httpSuccessApplicationStatus = function (response) {
        $scope.status = response;
    }

    $http.get(constant).success(function (response) {
        var application = response["baseURL"]+"applications/"+id+"/"; // with login
        var topAPI = response["baseURL"] + "applications/"+id+"/" + "analytics?type=group_by&field=api&size=20&interval=600000&from=1493301376899&to=1493387776899&";
        var status = response["baseURL"] + "applications/"+id+"/" + "analytics?type=group_by&field=status&ranges=100:199;200:299;300:399;400:499;500:599&interval=600000&from=1493301376899&to=1493387776899&";

        /* General */
        $http.get(application,{
            headers: {'Authorization': 'Basic ' + encode(localStorage.username+':'+localStorage.password)}
        }).success(httpSuccessApplicationAnalytics).error(function () {
            document.location.href="index.html";
        });

        /* topAPI */
        $http.get(topAPI,{
            headers: {'Authorization': 'Basic ' + encode(localStorage.username+':'+localStorage.password)}
        }).success(httpSuccessApplicationTopAPI).error(function () {
            document.location.href="index.html";
        });

        /* status */
        $http.get(status,{
            headers: {'Authorization': 'Basic ' + encode(localStorage.username+':'+localStorage.password)}
        }).success(httpSuccessApplicationStatus).error(function () {
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
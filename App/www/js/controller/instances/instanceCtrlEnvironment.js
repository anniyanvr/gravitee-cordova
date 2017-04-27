/**
 * Created by root on 26/04/17.
 */

function instanceCtrlEnvironment($scope, $routeParams, $http) {

    /* for instance menu */
    var event = $routeParams.event;
    var menuInstances = document.getElementById('menuInstances');
    menuInstances.setAttribute('style', 'display: inline-block width: 100%');
    document.getElementById('menuInstancesEnvironment').setAttribute('href','#/instancesEnvironment/'+event);
    document.getElementById('menuInstancesMonitoring').setAttribute('href','');

    /* for scope */
    var constant = "https://nightly.gravitee.io/constants.json";

    httpSuccessInstances = function (response) {
        $scope.rep = response;
        $scope.plugins = response.plugins;
//        $scope.systemProperties = response.systemProperties;
        console.log(response.systemProperties);
    }

    $http.get(constant).success(function (response) {

        //var instances = response["baseURL"]+"instances/"+id; // with login
        var instances = 'https://demo.gravitee.io/management/instances/'+event;

        $http.get(instances,{
            headers: {'Authorization': 'Basic ' + encode(localStorage.username+':'+localStorage.password)}
        }).success(httpSuccessInstances).error(function () {
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
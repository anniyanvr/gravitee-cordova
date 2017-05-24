/**
 * Created by root on 22/05/17.
 */

function configurationCtrlGroups($scope, $http) {

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

    // set default style for apiShow
    document.getElementById('apiShow').setAttribute('style','display: none');

    httpSuccessConfigurationGroups = function (response) {
        console.log(response);
        $scope.rep = response;
    }

    /* Select Management */
    $scope.selectGroup = function () {
        var selectElmt = document.getElementById('selectGroup');
        var value = selectElmt.options[selectElmt.selectedIndex].value;
        document.getElementById('applicationShow').setAttribute('style','display: none');
        document.getElementById('apiShow').setAttribute('style','display: none');
        if (value === 'application'){ document.getElementById('applicationShow').removeAttribute('style'); }
        if (value === 'api'){ document.getElementById('apiShow').removeAttribute('style'); }
    }

    // url
    var configurationGroups = localStorage.baseURL+"management/configuration/groups"; // with login

    // url processing
    $http.get(configurationGroups,{
        headers: {'Authorization': 'Basic ' + encode(localStorage.username+':'+localStorage.password)}
    }).success(httpSuccessConfigurationGroups).error(function () {
        document.location.href="index.html";
    });
}
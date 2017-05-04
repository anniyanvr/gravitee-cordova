/**
 * Created by Quentin on 05/04/2017.
 */

function apisCtrl($scope, $http) {

    var constant = localStorage.baseURL+"constants.json";
    var version = localStorage.baseURL+"build.json";
    var baseURLAPI;

    var loaderBar = document.getElementById('divLoader');
    loaderBar.setAttribute('class','progress');

    /*var showAPIs = document.getElementById('showAPIs');
    showAPIs.style.textAlign = 'center';
    showAPIs.style.marginBottom = '12px';*/

    /* get all views */
    var allViews = localStorage.baseURL + "management/configuration/views/";
    $http.get(allViews).success(function (response) {
        $scope.views = response;
    });

    /* change View */
    $scope.changeView = function () {
        var selectElmt = document.getElementById('selectView');
        var text = selectElmt.options[selectElmt.selectedIndex].text;
        var value = selectElmt.options[selectElmt.selectedIndex].value;
        if (text === "All APIs"){
            loaderBar.setAttribute('class','progress');
            $http.get(baseURLAPI,{
                headers: {'Authorization': 'Basic ' + encode(localStorage.username+':'+localStorage.password)}
            }).success(httpSuccessAllAPIS).error(function () {
                document.location.href="index.html";
            });
        }
        else {
            loaderBar.setAttribute('class','progress');
            var url = localStorage.baseURL + "management/apis/?view=" + value;
            $http.get(url,{
                headers: {'Authorization': 'Basic ' + encode(localStorage.username+':'+localStorage.password)}
            }).success(function (response) {
                $scope.rep = response;
                /* loaderBar */
                loaderBar.removeAttribute('class');
            });
        }
    }

    httpSuccessAllAPIS = function (response) {

        // First solution -- only javaScript
       /* console.log(response);
        for (var i = 0; i < 12; i++) {

            var api = document.createElement('button');
            api.setAttribute('id', response[0].id);
            api.style.width = '14em';
            api.style.background = 'url(' + response[0].picture_url + ') no-repeat';
            api.style.backgroundSize = '100px';
            api.style.height = '20em';
            api.style.backgroundPosition = 'center 8px';
            api.style.margin = '5px';

            var titleAPI = document.createElement('h3');
            titleAPI.innerText = '\n\n' + response[0].name + '(' + response[0].version + ')';

            var state = document.createElement('small');
            state.innerText = response[0].state;
            if (response[0].state == "started") {
                state.style.color = 'green';
            } else {
                state.style.color = 'red';
            }

            api.appendChild(titleAPI);
            api.appendChild(state);
            showAPIs.appendChild(api);
        }
        console.log(showAPIs);*/

        // Second solution -- with angular JS
        $scope.rep = response;

        /* loaderBar */
        loaderBar.removeAttribute('class');
    }
    httpSuccessVersion = function (response) {$scope.versionApis = response;}

    $http.get(constant).success(function (response) {
        $scope.portalTitle = response["portalTitle"];

        var apisAll = response["baseURL"]+"apis/"; // with login

        // var apisAll = "https://demo.gravitee.io/management/apis/"; // demo

        baseURLAPI = apisAll;
        $http.get(apisAll,{
            headers: {
                'Authorization': 'Basic ' + encode(localStorage.username+':'+localStorage.password)
            }
        }).success(httpSuccessAllAPIS).error(function () {
            document.location.href="index.html";
        });
    });
    $http.get(version).success(httpSuccessVersion);

    $scope.allAPIs = function () {
        loaderBar.setAttribute('class','progress');
        $http.get(baseURLAPI,{
            headers: {'Authorization': 'Basic ' + encode(localStorage.username+':'+localStorage.password)}
        }).success(httpSuccessAllAPIS).error(function () {
            document.location.href="index.html";
        });
    } /* show all APIs */

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
/**
 * Created by root on 10/05/17.
 */

function apisCtrlHealthCheck($scope, $routeParams, $http) {
    var id = $routeParams.id;
    //var constant = localStorage.baseURL+"constants.json";

    var selectElmt = document.getElementById('select_time');
    var text = selectElmt.options[selectElmt.selectedIndex].text;

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

    // timestamp date
    var now = new Date();
    var year    = now.getFullYear();
    var month   = ('0'+(now.getMonth()+1));
    var day     = ('0'+now.getDate()   ).slice(-2);
    var hour    = ('0'+now.getHours()  ).slice(-2);
    var min     = ('0'+now.getMinutes()).slice(-2);
    var second  = ('0'+now.getSeconds()).slice(-2);

    // create date time - default
    var lastHour = ( month +'/'+day+'/'+year+' '+'0'+(hour-1)+':'+min+':'+second);
    var date  = ( month +'/'+day+'/'+year+' '+hour+':'+min+':'+second);

    // set value - default
    $scope.Time_type = text;

    httpSuccessAPIHealthCheck = function (response) { $scope.rep = response; }
    httpSuccessAPIHealthCheckShow = function (response) { $scope.healthCheck = response; }

    function toTimestamp(strDate){
        var datum = Date.parse(strDate);
        return datum/1000;
    }

    function healtcheckFunction(val,d_1,d) {
        // set value
        $scope.date_1 = d_1;
        $scope.date = date;
        $scope.timestamp_interval = val;

        // default - lastHour
        var healthcheck = localStorage.baseURL + "management/apis/" + id +"/health?interval="+val+"&from="+toTimestamp(d_1)+"344&to="+toTimestamp(d)+"344";
        $http.get(healthcheck, {
            headers: {'Authorization': 'Basic ' + encode(localStorage.username + ':' + localStorage.password)}
        }).success(httpSuccessAPIHealthCheckShow).error(function () {
            document.location.href = "index.html";
        });
    }

    //$http.get(constant).success(function (response) {

        var api = localStorage.baseURL + "management/apis/" + id + "/"; // with login
        /* General */
        $http.get(api, {
            headers: {'Authorization': 'Basic ' + encode(localStorage.username + ':' + localStorage.password)}
        }).success(httpSuccessAPIHealthCheck).error(function () {
            document.location.href = "index.html";
        });

        healtcheckFunction("60000",lastHour,date);
    //});

    $scope.changeTime = function () {
        var selectElmt = document.getElementById('select_time');
        var text = selectElmt.options[selectElmt.selectedIndex].value;
        $scope.Time_type = text;

        var last5min = ( month +'/'+day+'/'+year+' '+hour+':'+(min-5)+':'+second);
        var lastHour = ( month +'/'+day+'/'+year+' '+'0'+(hour-1)+':'+min+':'+second);
        var last24Hours  = ( month +'/'+(day-1)+'/'+year+' '+hour+':'+min+':'+second);
        var last3Days  = ( month +'/'+'0'+(day-3)+'/'+year+' '+hour+':'+min+':'+second);
        var lastMonth  = ( '0'+(month-1) +'/'+day+'/'+year+' '+hour+':'+min+':'+second);
        var last3Months  = ( '0'+(month-3) +'/'+day+'/'+year+' '+hour+':'+min+':'+second);
        var date  = ( month +'/'+day+'/'+year+' '+hour+':'+min+':'+second);

        if (text === "last5minutes"){ healtcheckFunction("10000"        ,last5min       ,date); }
        if (text === "lastHour")    { healtcheckFunction("60000"        ,lastHour       ,date); }
        if (text === "last24Hours") { healtcheckFunction("3600000"      ,last24Hours    ,date); }
        if (text === "last3Days")   { healtcheckFunction("10800000"     ,last3Days      ,date); }
        if (text === "lastMonth")   { healtcheckFunction("10000000"     ,lastMonth      ,date); }
        if (text === "last3Months") { healtcheckFunction("10000000"     ,last3Months    ,date); }
    }

}
/**
 * Created by root on 28/04/17.
 */

function applicationCtrlAnalytics($scope, $routeParams, $http) {
    var id = $routeParams.id;
    var constant = localStorage.baseURL+"constants.json";

    // timestamp date
    var now = new Date();
    var year    = now.getFullYear();
    var month   = ('0'+(now.getMonth()+1));
    var day     = ('0'+now.getDate()   ).slice(-2);
    var hour    = ('0'+now.getHours()  ).slice(-2);
    var min     = ('0'+now.getMinutes()).slice(-2);
    var second  = ('0'+now.getSeconds()).slice(-2);
    var date_1  = ( month +'/'+'0'+(day-1)+'/'+year+' '+hour+':'+min+':'+second);
    var date  = ( month +'/'+day+'/'+year+' '+hour+':'+min+':'+second);

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
        var tab = createKeysAndValues(response);
        highcharts("status",tab[0],tab[1]);
    }

    function toTimestamp(strDate){
        var datum = Date.parse(strDate);
        return datum/1000;
    }

    $http.get(constant).success(function (response) {
        var application = response["baseURL"]+"applications/"+id+"/"; // with login
        var topAPI = response["baseURL"] + "applications/"+id+"/" +
            "analytics?type=group_by&field=api&size=20&interval=600000&from="+toTimestamp(date_1)+"899&to="+toTimestamp(date)+"899&";
        var status = response["baseURL"] +
            "applications/"+id+"/" + "analytics?type=group_by&field=status&ranges=100:199;200:299;300:399;400:499;500:599&interval=600000&from="+toTimestamp(date_1)+"899&to="+toTimestamp(date)+"899&";

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


    $scope.changeAPPAnalytics = function () {

        document.getElementById('boxTopApi').setAttribute('style','display: none');
        document.getElementById('boxStatus').setAttribute('style','display: none');
        document.getElementById('boxResponseStatus').setAttribute('style','display: none');
        document.getElementById('boxResponseTimes').setAttribute('style','display: none');
        document.getElementById('boxhitsByAPI').setAttribute('style','display: none');

        var selectElmt = document.getElementById('select_tabApp');
        var value = selectElmt.options[selectElmt.selectedIndex].value;

        if(value === "topAPIs")         { document.getElementById('boxTopApi').setAttribute('style','display: inline'); }
        if(value === "status")          { document.getElementById('boxStatus').setAttribute('style','display: inline'); }
        if(value === "responseStatus")  { document.getElementById('boxResponseStatus').setAttribute('style','display: inline'); }
        if(value === "responseTimes")   { document.getElementById('boxResponseTimes').setAttribute('style','display: inline'); }
        if(value === "hitsByAPI")       { document.getElementById('boxhitsByAPI').setAttribute('style','display: inline'); }

    }

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

    // Highcharts

    function createKeysAndValues(name) {
        var tt = [];
        var keys = []; var vals = [];
        for(var i in name){
            var key = i;
            var val = name[i];
            for(var j in val){
                var sub_key = j;
                var sub_val = val[j];
                keys.push(sub_key);
                vals.push(sub_val);
            }
        }
        tt.push(keys); tt.push(vals);
        return tt;
    }

    function highcharts(div,categories,data) {

        Highcharts.chart(div, {
            chart: {
                type: 'areaspline'
            },
            title: {
                text: div
            },
            legend: {
                layout: 'vertical',
                align: 'left',
                verticalAlign: 'top',
                x: 0,
                y: 0,
                floating: true,
                backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
            },
            xAxis: {
                categories: categories
            },
            yAxis: {
                title: {
                    text: 'Status'
                }
            },
            tooltip: {
                shared: true,
                valueSuffix: ' units'
            },
            credits: {
                enabled: false
            },
            plotOptions: {
                areaspline: {
                    fillOpacity: 0.5
                }
            },
            series: [{
                name: 'Status',
                data: data
            }]
        });
    }
}
/**
 * Created by root on 28/04/17.
 */

function applicationCtrlAnalytics($scope, $routeParams, $http) {
    var id = $routeParams.id;
//    var constant = localStorage.baseURL+"constants.json";

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
    var date_1  = ( month +'/'+'0'+(day-1)+'/'+year+' '+hour+':'+min+':'+second);
    var date  = ( month +'/'+day+'/'+year+' '+hour+':'+min+':'+second);

    // this is a test for cache
    // console.log("test for cache");

    httpSuccessApplicationAnalytics = function (response) { $scope.rep = response; }
    httpSuccessApplicationTopAPI = function (response) {
        var struct = response;
        var tbl = document.getElementById('id_table_topAPI'),
            k, hit, data;

        for( k in struct.values ){
            hit = struct.values[k];
            data = struct.metadata[k];

            tbl.innerHTML +=
                '<tr>' +
                '<td>' + data.name + '</td>' +
                '<td>' + hit + '</td>' +
                '</tr>';
        }
    }
    httpSuccessApplicationStatus = function (response) {
        var tab = createKeysAndValues(response);
        highchartsStatus("status",tab[0],tab[1]);
    }
    httpSuccessAppAnalyticsResponseStatus = function (response) {
        // console.log(response["values"][0].buckets.length);
        var keys = [] , data = [];
        for (var r = 0 ; r < response["values"][0].buckets.length; r++ ){
            keys.push(response["values"][0].buckets[r].name);
            data.push(response["values"][0].buckets[r].data);
        }
        var title = (document.getElementById("responseStatusText").getAttribute("value"));
        highcharts(title,"responseStatus",keys,data);
    }
    httpSuccessAppAnalyticsResponseTimes = function (response) {
        var keys = [] , donnees = [];

        for (let i=0;i<response["values"].length;i++){
            for (var r = 0 ; r < response["values"][0].buckets.length; r++ ){
                keys.push(response["values"][i].buckets[r].name);
                donnees.push(response["values"][i].buckets[r].data);
            }
            //    alert(donnees);
        }

        var title = (document.getElementById("responseTimesText").getAttribute("value"));
        highcharts(title,"responseTimes",keys,donnees);
    }
    httpSuccessAppAnalyticsHBAPI = function (response) {
        var keys = [] , data = [];
        for (var r = 0 ; r < response["values"][0].buckets.length; r++ ){
            var metadata = response["values"][0].metadata;
            keys.push(metadata[r+1].name);
            data.push(response["values"][0].buckets[r].data);
        }
        var title = (document.getElementById("HBAPIsText").getAttribute("value"));
        highcharts(title,"HBAPI",keys,data);
    }

    function toTimestamp(strDate){
        var datum = Date.parse(strDate);
        return datum/1000;
    }

//    $http.get(constant).success(function (response) {
        var application = localStorage.baseURL+"management/applications/"+id+"/"; // with login
        var topAPI = localStorage.baseURL + "management/applications/"+id+"/" +
            "analytics?type=group_by&field=api&size=20&interval=600000&from="+toTimestamp(date_1)+"899&to="+toTimestamp(date)+"899&";
        var status = localStorage.baseURL+"management/applications/"+id+"/" +
            "analytics?type=group_by&field=status&ranges=100:199;200:299;300:399;400:499;500:599&interval=600000&from="+toTimestamp(date_1)+"899&to="+toTimestamp(date)+"899&";

        var responseStatus = localStorage.baseURL+"management/applications/"+id+"/"+
            "analytics?type=date_histo&aggs=field:status&interval=600000&from="+toTimestamp(date_1)+"624&to="+toTimestamp(date)+"624&";
        var responseTimes = localStorage.baseURL+"management/applications/"+id+"/"+
            "analytics?type=date_histo&aggs=avg:response-time&interval=600000&from="+toTimestamp(date_1)+"624&to="+toTimestamp(date)+"624&";
        var hitsByAPI = localStorage.baseURL+"management/applications/"+id+"/"+
            "analytics?type=date_histo&aggs=field:api&interval=600000&from="+toTimestamp(date_1)+"624&to="+toTimestamp(date)+"624&";

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

        /* Response Status */
        $http.get(responseStatus,{
            headers: {'Authorization': 'Basic ' + encode(localStorage.username+':'+localStorage.password)}
        }).success(httpSuccessAppAnalyticsResponseStatus).error(function () {
            document.location.href="index.html";
        });

        /* Response Times */
        $http.get(responseTimes,{
            headers: {'Authorization': 'Basic ' + encode(localStorage.username+':'+localStorage.password)}
        }).success(httpSuccessAppAnalyticsResponseTimes).error(function () {
            document.location.href="index.html";
        });

        /* Hits By API */
        $http.get(hitsByAPI,{
            headers: {'Authorization': 'Basic ' + encode(localStorage.username+':'+localStorage.password)}
        }).success(httpSuccessAppAnalyticsHBAPI).error(function () {
            document.location.href="index.html";
        });

  //  });


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

    function highchartsStatus(div,categories,data) {
        Highcharts.chart(div, {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie'
            },
            title: {
                text: 'Status'
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                        style: {
                            color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                        }
                    }
                }
            },
            series: [{
                name: 'Brands',
                colorByPoint: true,
                data: [{
                    name: categories[0],
                    y: data[0]
                }, {
                    name: categories[1],
                    y: data[1]
                }, {
                    name: categories[2],
                    y: data[2]
                }, {
                    name: categories[3],
                    y: data[3]
                }, {
                    name: categories[4],
                    y: data[4]
                }]
            }]
        });
    }

    function highcharts(title,div,categories,data) {

        //      console.log(categories);
        //      console.log(data[0]);
        var series = [];
        for (var i = 0 ; i<categories.length; i++){
            series.push({
                name: categories[i],
                data: data[i]
            });
        }
        console.log(series);

        Highcharts.chart(div, {
            chart: {
                type: 'areaspline'
            },
            title: {
                text: title
            },
            xAxis: {
                type: 'datetime'
            },
            yAxis: {
                title: {
                    text: title
                }
            },
            tooltip: {
                shared: true
            },
            credits: {
                enabled: false
            },
            plotOptions: {
                areaspline: {
                    fillOpacity: 0.5
                }
            },
            series: series
        });
    }
}
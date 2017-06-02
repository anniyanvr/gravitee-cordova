/**
 * Created by root on 28/04/17.
 */

function applicationCtrlAnalytics($scope, $routeParams, $http) {
    var id = $routeParams.id;

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

    function NbJourParMois(iMonth)
    {
        console.log('test : ');
        var date = new Date();
        console.log(32 - new Date(date.getFullYear(), iMonth,  32).getDate());
        return (32 - new Date(date.getFullYear(), iMonth,  32).getDate());
    }

    if(day === '01'){
        var month_1 = ('0'+(now.getMonth()));
        var days_month_1 = NbJourParMois(month_1,year);
        date_1  = ( month_1 +'/'+(days_month_1)+'/'+year+' '+hour+':'+min+':'+second);
        console.log(date_1);
    }

    // functions
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

        var from, to, interval;
        from = response["timestamp"]["from"];
        to = response["timestamp"]["to"];
        interval = response["timestamp"]["interval"];

        for (var r = 0 ; r < response["values"][0].buckets.length; r++ ){
            keys.push(response["values"][0].buckets[r].name);
            data.push(response["values"][0].buckets[r].data);
        }
        var title = (document.getElementById("responseStatusText").getAttribute("value"));
        highcharts(title,"responseStatus",keys,data,from,to,interval);
    }
    httpSuccessAppAnalyticsResponseTimes = function (response) {
        var keys = [] , donnees = [];

        var from, to, interval;
        from = response["timestamp"]["from"];
        to = response["timestamp"]["to"];
        interval = response["timestamp"]["interval"];

        for (let i=0;i<response["values"].length;i++){
            for (var r = 0 ; r < response["values"][0].buckets.length; r++ ){
                keys.push(response["values"][i].buckets[r].name);
                donnees.push(response["values"][i].buckets[r].data);
            }
            //    alert(donnees);
        }

        var title = (document.getElementById("responseTimesText").getAttribute("value"));
        highcharts(title,"responseTimes",keys,donnees,from,to,interval);
    }
    httpSuccessAppAnalyticsHBAPI = function (response) {
        var keys = [] , donnees = [], id=[] ;

        var from, to, interval;
        from = response["timestamp"]["from"];
        to = response["timestamp"]["to"];
        interval = response["timestamp"]["interval"];

        for (var r=0;r<response.values[0].buckets.length;r++){
            id.push(response.values[0].buckets[r].name);
            donnees.push(response.values[0].buckets[r].data);
        }
        for (var i=0;i<id.length;i++){
            keys.push(response.values[0].metadata[id[i]].name);
        }

        var title = (document.getElementById("HBAPIsText").getAttribute("value"));
        highcharts(title,"HBAPI",keys,donnees,from,to,interval);
    }

    // convert date to timestamp
    function toTimestamp(strDate){
        var datum = Date.parse(strDate);
        return datum/1000;
    }

    /* Definition of URLs */
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

    /* ----- URLs processing ----- */
    /* General */
    $http.get(application,{
        headers: {
            'Authorization': 'Basic ' + localStorage.authorization
        }
    }).success(httpSuccessApplicationAnalytics).error(function () {
        document.location.href="index.html";
    });

    /* topAPI */
    $http.get(topAPI,{
        headers: {
            'Authorization': 'Basic ' + localStorage.authorization
        }
    }).success(httpSuccessApplicationTopAPI).error(function () {
        document.location.href="index.html";
    });

    /* status */
    $http.get(status,{
        headers: {
            'Authorization': 'Basic ' + localStorage.authorization
        }
    }).success(httpSuccessApplicationStatus).error(function () {
        document.location.href="index.html";
    });

    /* Response Status */
    $http.get(responseStatus,{
        headers: {
            'Authorization': 'Basic ' + localStorage.authorization
        }
    }).success(httpSuccessAppAnalyticsResponseStatus).error(function () {
        document.location.href="index.html";
    });

    /* Response Times */
    $http.get(responseTimes,{
        headers: {
            'Authorization': 'Basic ' + localStorage.authorization
        }
    }).success(httpSuccessAppAnalyticsResponseTimes).error(function () {
        document.location.href="index.html";
    });

    /* Hits By API */
    $http.get(hitsByAPI,{
        headers: {
            'Authorization': 'Basic ' + localStorage.authorization
        }
    }).success(httpSuccessAppAnalyticsHBAPI).error(function () {
        document.location.href="index.html";
    });

    /* Select management */
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
                    name: '1xx',
                    y: data[0]
                }, {
                    name: '2xx',
                    y: data[1]
                }, {
                    name: '3xx',
                    y: data[2]
                }, {
                    name: '4xx',
                    y: data[3]
                }, {
                    name: '5xx',
                    y: data[4]
                }]
            }]
        });
    }

    function highcharts(title,div,categories,data,from,to,interval) {

        // variables
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
                type: 'datetime',
                dateTimeLabelFormats: {
                    minTickInterval: 24 * 3600 * 1000,
                    millisecond: '%b %e'
                },
                title: {
                    text: null
                }
            },
            yAxis: {
                title: {
                    text: title
                }
            },
            plotOptions: {
                series: {
                    pointStart: from,
                    pointEnd: to,
                    pointInterval: interval
                }
            },
            tooltip: {
                shared: true
            },
            credits: {
                enabled: false
            },
            series: series
        });
    }
}
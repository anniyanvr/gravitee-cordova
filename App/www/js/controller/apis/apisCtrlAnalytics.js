/**
 * Created by root on 28/04/17.
 */

function apisCtrlAnalytics($scope, $routeParams, $http) {
    var id = $routeParams.id;
    //var constant = localStorage.baseURL+"constants.json";

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
        var days_month_1 = NbJourParMois(month_1);
        date_1  = ( month_1 +'/'+(days_month_1)+'/'+year+' '+hour+':'+min+':'+second);
        console.log(date_1);
    }

    /* Application - default */
    $scope.showTopApplication = 'true';
    $scope.showTopPlan = 'true';
    $scope.showSlowApplications = 'true';

    /* ----- data processing ----- */
    /* General */
    httpSuccessAPIAnalytics = function (response) { $scope.rep = response; }

    /* Applications */
    httpSuccessAPIAnalyticsApplications = function (response) {

        var struct = response;
        var tbl = document.getElementById('id_table_applications'),
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

    /* Status */
    httpSuccessAPIAnalyticsStatus = function (response) {
        var tab = createKeysAndValues(response);
        highchartsStatus("status",tab[0],tab[1]);
    }

    /* Plan */
    httpSuccessAPIAnalyticsPlan = function (response) {

        var struct = response;
        var tbl = document.getElementById('id_table_plans'),
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

    /* SlowApplications */
    httpSuccessAPIAnalyticsSlowApplications = function (response) {

        var struct = response;
        var tbl = document.getElementById('id_table_slowApplications'),
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

    /* ResponseStatus */
    httpSuccessAPIAnalyticsResponseStatus = function (response) {
        // console.log(response["values"][0].buckets.length);
        var keys = [] , data = [];
        for (var r = 0 ; r < response["values"][0].buckets.length; r++ ){
            keys.push(response["values"][0].buckets[r].name);
            data.push(response["values"][0].buckets[r].data);
        }
        var title = (document.getElementById("responseStatusText").getAttribute("value"));
        highcharts(title,"responseStatus",keys,data);
    }

    /* ResponseTimes */
    httpSuccessAPIAnalyticsResponseTimes = function (response) {
        var keys = [] , donnees = [];

        for (let i=0;i<response["values"].length;i++){
            for (var r = 0 ; r < response["values"][0].buckets.length; r++ ){
                keys.push(response["values"][i].buckets[r].name);
                donnees.push(response["values"][0].buckets[r].data);
            }
        }

        var title = (document.getElementById("responseTimesText").getAttribute("value"));
        highcharts(title,"responseTimes",keys,donnees);
    }

    /* Hits by Applications */
    httpSuccessAPIAnalyticsHBApplications = function (response) {
        var keys = [] , donnees = [], id=[] ;
        for (var r=0;r<response.values[0].buckets.length;r++){
            id.push(response.values[0].buckets[r].name);
            donnees.push(response.values[0].buckets[r].data);
        }
        for (var i=0;i<id.length;i++){
            keys.push(response.values[0].metadata[id[i]].name);
        }
        var title = (document.getElementById("HBApplicationsText").getAttribute("value"));
        highcharts(title,"HBApplications",keys,donnees);
    }

    /* convert date to timestamp */
    function toTimestamp(strDate){
        var datum = Date.parse(strDate);
        return datum/1000;
    }

    /* Definition of URLs */
    var api = localStorage.baseURL+"management/apis/"+id+"/"; // with login
    var applications = localStorage.baseURL+"management/apis/" + id +
        "/analytics?type=group_by&field=application&size=20&interval=600000&from="+toTimestamp(date_1)+"908&to="+toTimestamp(date)+"908&";
    var status = localStorage.baseURL+"management/apis/" + id + "/analytics?type=group_by&field=status&ranges=100:199;200:299;300:399;400:499;500:599&interval=600000&from="+toTimestamp(date_1)+"478&to="+toTimestamp(date)+"478&";
    var topPlan = localStorage.baseURL+"management/apis/" + id + "/analytics?type=group_by&field=plan&size=20&interval=600000&from="+toTimestamp(date_1)+"607&to="+toTimestamp(date)+"607&";
    var topSlowApplications = localStorage.baseURL+"management/apis/" + id +
        "/analytics?type=group_by&field=application&order=-avg:response-time&size=20&interval=43200000&from="+toTimestamp(date_1)+"780&to="+toTimestamp(date)+"780&";

    var responseStatus = localStorage.baseURL+"management/apis/"+id+"/analytics?type=date_histo&aggs=field:status&interval=600000&from="+toTimestamp(date_1)+"646&to="+toTimestamp(date)+"646&";
    var responseTimes = localStorage.baseURL+"management/apis/"+id+
        "/analytics?type=date_histo&aggs=avg:response-time;avg:api-response-time&interval=600000&from="+toTimestamp(date_1)+"173&to="+toTimestamp(date)+"765&";
    var hitsByApplications = localStorage.baseURL+"management/apis/"+id+
        "/analytics?type=date_histo&aggs=field:application&interval=600000&from="+toTimestamp(date_1)+"539&to="+toTimestamp(date)+"764&";

    /* ----- URLs processing ----- */
    /* General */
    $http.get(api,{
        headers: {'Authorization': 'Basic ' + localStorage.authorization}
    }).success(httpSuccessAPIAnalytics).error(function () {
        document.location.href="index.html";
    });

    /* Top applications */
    $http.get(applications,{
        headers: {'Authorization': 'Basic ' + localStorage.authorization}
    }).success(httpSuccessAPIAnalyticsApplications).error(function () {
        document.location.href="index.html";
    });

    /* Status */
    $http.get(status,{
        headers: {'Authorization': 'Basic ' + localStorage.authorization}
    }).success(httpSuccessAPIAnalyticsStatus).error(function () {
        document.location.href="index.html";
    });

    /* Top plan */
    $http.get(topPlan,{
        headers: {'Authorization': 'Basic ' + localStorage.authorization}
    }).success(httpSuccessAPIAnalyticsPlan).error(function () {
        document.location.href="index.html";
    });

    /* Top slow applications */
    $http.get(topSlowApplications,{
        headers: {'Authorization': 'Basic ' + localStorage.authorization}
    }).success(httpSuccessAPIAnalyticsSlowApplications).error(function () {
        document.location.href="index.html";
    });

    /* Response Status */
    $http.get(responseStatus,{
        headers: {'Authorization': 'Basic ' + localStorage.authorization}
    }).success(httpSuccessAPIAnalyticsResponseStatus).error(function () {
        document.location.href="index.html";
    });

    /* Response Times */
    $http.get(responseTimes,{
        headers: {'Authorization': 'Basic ' + localStorage.authorization}
    }).success(httpSuccessAPIAnalyticsResponseTimes).error(function () {
        document.location.href="index.html";
    });

    /* Hits By Applications */
    $http.get(hitsByApplications,{
        headers: {'Authorization': 'Basic ' + localStorage.authorization}
    }).success(httpSuccessAPIAnalyticsHBApplications).error(function () {
        document.location.href="index.html";
    });

    /* Select management */
    $scope.changeAPIsAnalytics = function () {

        document.getElementById('boxTopApp').setAttribute('style','display: none');
        document.getElementById('boxStatus').setAttribute('style','display: none');
        document.getElementById('boxTopPlan').setAttribute('style','display: none');
        document.getElementById('boxTopSlowApp').setAttribute('style','display: none');
        document.getElementById('boxResponseStatus').setAttribute('style','display: none');
        document.getElementById('boxResponseTimes').setAttribute('style','display: none');
        document.getElementById('boxHitsByApp').setAttribute('style','display: none');

        var selectElmt = document.getElementById('select_tabAPIs');
        var value = selectElmt.options[selectElmt.selectedIndex].value;

        if(value === "topApplications")     { document.getElementById('boxTopApp').setAttribute('style','display: inline'); }
        if(value === "status")              { document.getElementById('boxStatus').setAttribute('style','display: inline'); }
        if(value === "topPlan")             { document.getElementById('boxTopPlan').setAttribute('style','display: inline'); }
        if(value === "topSlowApplications") { document.getElementById('boxTopSlowApp').setAttribute('style','display: inline'); }
        if(value === "responseStatus")      { document.getElementById('boxResponseStatus').setAttribute('style','display: inline'); }
        if(value === "responseTimes")       { document.getElementById('boxResponseTimes').setAttribute('style','display: inline'); }
        if(value === "hitsByApplication")   { document.getElementById('boxHitsByApp').setAttribute('style','display: inline'); }

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

    function highcharts(title,div,categories,data) {

        // variables
        var series = [];

        // show

        var day_show = day;
        var month_show = month;
        var year_show = year;

        if (day === '01') {
            if (month === '01') {
                day_show = NbJourParMois(12);
                month_show = 12;
                year_show = parseInt(year) - 1;
            }
            else {
                day_show = NbJourParMois(parseInt(month) - 1);
                month_show = parseInt(month) - 1;
            }
        }
        else { day_show = parseInt(day)-1; }

        var start_date  = ( month_show+'/'+day_show+'/' + year_show+' '+hour+':'+min+':'+second) ;
        var end_date    = ( month+'/'+day+'/'+year+' '+hour+':'+min+':'+second);

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
                    pointStart: parseInt(toTimestamp(start_date)+'000'),
                    pointEnd: parseInt(toTimestamp(end_date)+'000'),
                    pointInterval: 600000
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
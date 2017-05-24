/**
 * Created by root on 28/04/17.
 */

function dashboardCtrl($scope, $http) {

    var selectPage = document.getElementById('selectPage');

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

    // functions
    httpSuccessAPIDashboard = function (response) {
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
    httpSuccessApplicationsDashboard = function (response) {

        //console.log(typeof (response.value) === 'undefined');
        var struct = response;
        var tbl = document.getElementById('id_table_topApplications'),
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
    httpSuccessFailedAPIsDashboard = function (response) {
        var struct = response;
        var tbl = document.getElementById('id_table_topFailedAPIs'),
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
    httpSuccessTopOverheadAPIsDashboard = function (response) {

        var struct = response;
        var tbl = document.getElementById('id_table_topOverheadAPIs'),
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
    httpSuccessTopSlowAPIsDashboard = function (response) {

        var struct = response;
        var tbl = document.getElementById('top_slowAPIs'),
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
    httpSuccessEventDashboard = function (response) {
        var totalElements = response.totalElements;
        console.log(totalElements);
        $scope.event = response.content;

        // add page number -- select
        for (var i=0;i<totalElements/10;i++){
            var number = document.createElement('option');
            number.innerHTML =
                "<option>" + (i+1) + "</option>";
            selectPage.appendChild(number);
        }
    }

    // select page management
    $scope.selectPage = function () {
        var selectElmt = document.getElementById('selectPage');
        var num = selectElmt.options[selectElmt.selectedIndex].text;
        var event = localStorage.baseURL +
            "management/platform/events?type=START_API,STOP_API,PUBLISH_API,UNPUBLISH_API&api_ids=&from=" + toTimestamp(date_1) + "487&to=" + toTimestamp(date) + "487&page=" + (num-1) + "&size=10";
        $http.get(event,{
            headers: {'Authorization': 'Basic ' + encode(localStorage.username+':'+localStorage.password)}
        }).success(function (response) {
            $scope.event = response.content;
        }).error(function () {
            document.location.href="index.html";
        });
    }

    // convert date to timestamp
    function toTimestamp(strDate){
        var datum = Date.parse(strDate);
        return datum/1000;
    }

    // URLs
    var apis = localStorage.baseURL +
        "management/platform/analytics?type=group_by&field=api&size=10000&interval=600000&from=" + toTimestamp(date_1) + "269&to=" + toTimestamp(date) + "269&";
    var applications = localStorage.baseURL +
        "management/platform/analytics?type=group_by&field=application&size=10000&interval=600000&from=" + toTimestamp(date_1) + "269&to=" + toTimestamp(date) + "269&";
    var failedAPIs = localStorage.baseURL +
        "management/platform/analytics?type=group_by&field=api&query=status:[500%20TO%20599]&size=10000&interval=600000&from=" + toTimestamp(date_1) + "269&to=" + toTimestamp(date) + "269&";
    var topSlowAPIs = localStorage.baseURL +
        "management/platform/analytics?type=group_by&field=api&order=-avg:response-time&size=10000&interval=600000&from=" + toTimestamp(date_1) + "269&to=" + toTimestamp(date) + "269&";
    var topOverheadAPIs = localStorage.baseURL +
        "management/platform/analytics?type=group_by&field=api&order=-avg:proxy-latency&size=10000&interval=600000&from=" + toTimestamp(date_1) + "269&to=" + toTimestamp(date) + "269&";
    var event = localStorage.baseURL +
        "management/platform/events?type=START_API,STOP_API,PUBLISH_API,UNPUBLISH_API&api_ids=&from=" + toTimestamp(date_1) + "298&to=" + toTimestamp(date) + "298&page=0&size=10";

    // URLs processing
    /* apis */
    $http.get(apis,{
        headers: {'Authorization': 'Basic ' + encode(localStorage.username+':'+localStorage.password)}
    }).success(httpSuccessAPIDashboard).error(function () {
        document.location.href="index.html";
    });

    /* applications */
    $http.get(applications,{
        headers: {'Authorization': 'Basic ' + encode(localStorage.username+':'+localStorage.password)}
    }).success(httpSuccessApplicationsDashboard).error(function () {
        document.location.href="index.html";
    });

    /* failedAPIs */
    $http.get(failedAPIs,{
        headers: {'Authorization': 'Basic ' + encode(localStorage.username+':'+localStorage.password)}
    }).success(httpSuccessFailedAPIsDashboard).error(function () {
        document.location.href="index.html";
    });

    /* topSlowAPIs */
    $http.get(topSlowAPIs,{
        headers: {'Authorization': 'Basic ' + encode(localStorage.username+':'+localStorage.password)}
    }).success(httpSuccessTopSlowAPIsDashboard).error(function () {
        document.location.href="index.html";
    });

    /* topOverheadAPIs */
    $http.get(topOverheadAPIs,{
        headers: {'Authorization': 'Basic ' + encode(localStorage.username+':'+localStorage.password)}
    }).success(httpSuccessTopOverheadAPIsDashboard).error(function () {
        document.location.href="index.html";
    });

    /* event */
    $http.get(event,{
        headers: {'Authorization': 'Basic ' + encode(localStorage.username+':'+localStorage.password)}
    }).success(httpSuccessEventDashboard).error(function () {
        document.location.href="index.html";
    });

    // Select Management
    $scope.changeDashboardAnalytics = function () {

        document.getElementById('boxTopApi').setAttribute('style','display: none');
        document.getElementById('boxTopApplications').setAttribute('style','display: none');
        document.getElementById('boxTopFailedAPIs').setAttribute('style','display: none');
        document.getElementById('boxTopSlowAPIs').setAttribute('style','display: none');
        document.getElementById('boxTopOverheadAPIs').setAttribute('style','display: none');
        document.getElementById('boxAPIEvents').setAttribute('style','display: none');

        var selectElmt = document.getElementById('select_tabDashboard');
        var value = selectElmt.options[selectElmt.selectedIndex].value;

        if(value === "topAPIs")         { document.getElementById('boxTopApi').setAttribute('style','display: inline'); }
        if(value === "topApp")          { document.getElementById('boxTopApplications').setAttribute('style','display: inline'); }
        if(value === "topFailedAPIs")   { document.getElementById('boxTopFailedAPIs').setAttribute('style','display: inline'); }
        if(value === "topSlowAPIs")     { document.getElementById('boxTopSlowAPIs').setAttribute('style','display: inline'); }
        if(value === "topOverheadAPIs") { document.getElementById('boxTopOverheadAPIs').setAttribute('style','display: inline'); }
        if(value === "apiEvent")        { document.getElementById('boxAPIEvents').setAttribute('style','display: inline'); }

    }
}
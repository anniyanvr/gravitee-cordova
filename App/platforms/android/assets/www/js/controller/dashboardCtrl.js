/**
 * Created by root on 28/04/17.
 */

function dashboardCtrl($scope, $http) {

    var selectPage = document.getElementById('selectPage');

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

    // From date1 to date2
    $scope.fromTo = function () {
        date_1 = document.getElementById('date1').value;
        date = document.getElementById('date2').value;

        if (toTimestamp(date_1) > toTimestamp(date)) {
            $scope.error = Materialize.toast('Error : date1 > date2. Please try again!', 4000, 'orange');
        }
        else if (date_1 === "" || date === ""){
            $scope.error = Materialize.toast('Error : Choose 2 dates please!', 4000, 'orange');
        }
        else { defURLs();}
    }

    $scope.error = "";


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

        // clear
        var elt = selectPage.childElementCount;
        for (var j=0;j<elt;j++){
            selectPage.removeChild(j);
        }

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
            headers: {
                'Authorization': 'Basic ' + localStorage.authorization
            }
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

    //default
    defURLs();

    /* Definition of URLs */
    function defURLs() {

        $scope.date_now_1 = date_1;
        $scope.date_now = date;

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
        $http.get(apis, {
            headers: {
                'Authorization': 'Basic ' + localStorage.authorization
            }
        }).success(httpSuccessAPIDashboard).error(function () {
            document.location.href = "index.html";
        });

        /* applications */
        $http.get(applications, {
            headers: {
                'Authorization': 'Basic ' + localStorage.authorization
            }
        }).success(httpSuccessApplicationsDashboard).error(function () {
            document.location.href = "index.html";
        });

        /* failedAPIs */
        $http.get(failedAPIs, {
            headers: {
                'Authorization': 'Basic ' + localStorage.authorization
            }
        }).success(httpSuccessFailedAPIsDashboard).error(function () {
            document.location.href = "index.html";
        });

        /* topSlowAPIs */
        $http.get(topSlowAPIs, {
            headers: {
                'Authorization': 'Basic ' + localStorage.authorization
            }
        }).success(httpSuccessTopSlowAPIsDashboard).error(function () {
            document.location.href = "index.html";
        });

        /* topOverheadAPIs */
        $http.get(topOverheadAPIs, {
            headers: {
                'Authorization': 'Basic ' + localStorage.authorization
            }
        }).success(httpSuccessTopOverheadAPIsDashboard).error(function () {
            document.location.href = "index.html";
        });

        /* event */
        $http.get(event, {
            headers: {
                'Authorization': 'Basic ' + localStorage.authorization
            }
        }).success(httpSuccessEventDashboard).error(function () {
            document.location.href = "index.html";
        });
    }

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
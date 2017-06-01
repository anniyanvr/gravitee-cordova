/**
 * Created by root on 10/05/17.
 */

function apisCtrlHealthCheck($scope, $routeParams, $http) {
    var id = $routeParams.id;
    //var constant = localStorage.baseURL+"constants.json";

    var selectElmt = document.getElementById('select_time');
    var text = selectElmt.options[selectElmt.selectedIndex].text;

    // timestamp date
    var now = new Date();
    var year    = now.getFullYear();
    var month   = ('0'+(now.getMonth()+1));
    var day     = ('0'+now.getDate()   ).slice(-2);
    var hour    = ('0'+now.getHours()  ).slice(-2);
    var min     = ('0'+now.getMinutes()).slice(-2);
    var second  = ('0'+now.getSeconds()).slice(-2);

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

    // create date time - default
    var lastHour = ( month +'/'+day+'/'+year+' '+'0'+(hour-1)+':'+min+':'+second);
    var date  = ( month +'/'+day+'/'+year+' '+hour+':'+min+':'+second);

    // set value - default
    $scope.Time_type = text;

    httpSuccessAPIHealthCheck = function (response) { $scope.rep = response; }
    httpSuccessAPIHealthCheckShow = function (response) { $scope.healthCheck = response; }

    // convert date to timestamp
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
            headers: {
                'Authorization': 'Basic ' + localStorage.authorization
            }
        }).success(httpSuccessAPIHealthCheckShow).error(function () {
            document.location.href = "index.html";
        });
    }

    var api = localStorage.baseURL + "management/apis/" + id + "/"; // with login

    /* General */
    $http.get(api, {
        headers: {
            //'Authorization': 'Basic ' + encode(localStorage.username + ':' + localStorage.password)
            'Authorization': 'Basic ' + localStorage.authorization
        }
    }).success(httpSuccessAPIHealthCheck).error(function () {
        document.location.href = "index.html";
    });

    healtcheckFunction("60000",lastHour,date);

    // change time with select
    $scope.changeTime = function () {
        var selectElmt = document.getElementById('select_time');
        var text = selectElmt.options[selectElmt.selectedIndex].value;
        $scope.Time_type = text;

        var last5min = ( month +'/'+day+'/'+year+' '+hour+':'+(min-5)+':'+second);
        var lastHour = ( month +'/'+day+'/'+year+' '+'0'+(hour-1)+':'+min+':'+second);

        var last24Hours, last3Days;

        var month_1 = ('0'+(now.getMonth()));
        var days_month_1 = NbJourParMois(month_1,year);

        if(day === '01'){
            last24Hours  = ( month_1 +'/'+(days_month_1)+'/'+year+' '+hour+':'+min+':'+second);
            //console.log(date_1);
        }
        else{
            last24Hours  = ( month +'/'+(day-1)+'/'+year+' '+hour+':'+min+':'+second);
        }

        if(day === '01'){
            last3Days = ( month_1 +'/'+(days_month_1-2)+'/'+year+' '+hour+':'+min+':'+second);
        }
        else if(day === '02'){
            last3Days = ( month_1 +'/'+(days_month_1-1)+'/'+year+' '+hour+':'+min+':'+second);
        }
        else if(day === '03'){
            last3Days = ( month_1 +'/'+(days_month_1)+'/'+year+' '+hour+':'+min+':'+second);
        }
        else {
            last3Days  = ( month +'/'+'0'+(day-3)+'/'+year+' '+hour+':'+min+':'+second);
        }

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
/**
 * Created by Quentin on 05/04/2017.
 */

function apisCtrl($scope, $http) {

    var loaderBar = document.getElementById('divLoader');
    loaderBar.setAttribute('class','progress');

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
                headers: {
                    'Authorization': 'Basic ' + localStorage.authorization
                }
            }).success(httpSuccessAllAPIS).error(function () {
                document.location.href="index.html";
            });
        }
        else {
            loaderBar.setAttribute('class','progress');
            var url = localStorage.baseURL + "management/apis/?view=" + value;
            $http.get(url,{
                headers: {
                    'Authorization': 'Basic ' + localStorage.authorization
                }
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

    var apisAll = localStorage.baseURL+"management/apis/"; // with login

    baseURLAPI = apisAll;
    $http.get(apisAll,{
        headers: {
            'Authorization': 'Basic ' + localStorage.authorization
        }
    }).success(httpSuccessAllAPIS).error(function () {
        document.location.href="index.html";
    });

    /* show all APIs */
    $scope.allAPIs = function () {
        loaderBar.setAttribute('class','progress');
        $http.get(baseURLAPI,{
            headers: {
                'Authorization': 'Basic ' + localStorage.authorization
            }
        }).success(httpSuccessAllAPIS).error(function () {
            document.location.href="index.html";
        });
    }
}
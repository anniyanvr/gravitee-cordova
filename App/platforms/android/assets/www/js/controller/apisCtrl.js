/**
 * Created by Quentin on 05/04/2017.
 */

function apisCtrl($scope, $http, apisList, viewsList) {

    /* -- RESOLVE -- */

    // list of all APIs
    $scope.rep = apisList.data;

    // list of views
    $scope.views = viewsList.data;


    /* -- FOR UPDATE -- */

    /* change View */
    $scope.changeView = function () {
        var selectElmt = document.getElementById('selectView');
        var text = selectElmt.options[selectElmt.selectedIndex].text;
        var value = selectElmt.options[selectElmt.selectedIndex].value;
        if (text === "All APIs"){
            $http.get(localStorage.baseURL+"management/apis/",{
                headers: {
                    'Authorization': 'Basic ' + localStorage.authorization
                }
            }).success(httpSuccessAllAPIS).error(function () {
                document.location.href="index.html";
            });
        }
        else {
            var url = localStorage.baseURL + "management/apis/?view=" + value;
            $http.get(url,{
                headers: {
                    'Authorization': 'Basic ' + localStorage.authorization
                }
            }).success(function (response) {
                $scope.rep = response;
            });
        }
    }

    /* show all APIs */
    $scope.allAPIs = function () {
        $http.get(localStorage.baseURL+"management/apis/",{
            headers: {
                'Authorization': 'Basic ' + localStorage.authorization
            }
        }).success(httpSuccessAllAPIS).error(function () {
            document.location.href="index.html";
        });
    }
}
/**
 * Created by root on 26/04/17.
 */

function instanceCtrlEnvironment($scope, $routeParams, $http) {

    /* for instance menu */
    var event = $routeParams.event;
    var menuInstances = document.getElementById('menuInstances');
    menuInstances.setAttribute('style', 'display: inline-block width: 100%');
    document.getElementById('menuInstancesEnvironment').setAttribute('href','#/instancesEnvironment/'+event);
    document.getElementById('menuInstancesMonitoring').setAttribute('href','#/instancesMonitoring/'+event);

    /* for scope */
    //    var constant = localStorage.baseURL + "constants.json";

    httpSuccessInstances = function (response) {
        $scope.rep = response;
        $scope.plugins = response.plugins;

        var tr = document.getElementById('systemProperties');

        for(var key in response.systemProperties){

            // create element
            var trd = document.createElement("tr");
            var td = document.createElement("td");
            var td_2 = document.createElement("td");

            // set key and value
            td.innerHTML = key;
            td_2.innerHTML = response.systemProperties[key];

            // tests with alert
//            alert('td : '+ td);
//            alert('td_2 : ' + td_2);

            // appendChild
            // <tr>
            //   <td> <!-- key --> </td>
            //   <td> <!-- value --> </td>
            // </tr>

            tr.appendChild(trd);
            tr.appendChild(td);
            tr.appendChild(td_2);
        }

//        alert(tr);

    }

    var instances = localStorage.baseURL+"management/instances/"+event; // with login

    $http.get(instances,{
        headers: {
            'Authorization': 'Basic ' + localStorage.authorization
        }
    }).success(httpSuccessInstances).error(function () {
        document.location.href="index.html";
    });
}
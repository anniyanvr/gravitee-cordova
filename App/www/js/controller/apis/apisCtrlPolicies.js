/**
 * Created by root on 09/05/17.
 */

function apisCtrlPolicies($scope, myApiPoliciesInfo, myApiPolicies) {

    /* -- RESOLVE -- */
    $scope.rep = myApiPoliciesInfo.data;
    $scope.policies = myApiPolicies.data;

}
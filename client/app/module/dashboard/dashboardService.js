/**
 * Created by Ashish Lamse on 7/9/16.
 */

(function(){
angular.module('dashboardModule')
    .factory('dashboardService',dashboardService);

    dashboardService.$inject=['demoApi','$q'];
    function dashboardService(demoApi,$q){
        var service = {
            getUserDetails : getUserDetails,
            deleteUser     : deleteUser,
            getUser       : getUser,
            editUser:editUser
        };

        return service;

        function editUser(query){
            var deferred = $q.defer();
            demoApi.editUser(query).$promise.then(editUserComplete).catch(editUserFailed);

            function editUserComplete(result){
                deferred.resolve(result)
            }

            function editUserFailed(error){
                deferred.reject(error);
            }
            return deferred.promise;
        }

        function getUser(query){
            var deferred = $q.defer();
            demoApi.getUser(query).$promise.then(getUserComplete).catch(getUserFailed);

            function getUserComplete(response){
                deferred.resolve(response);
            }

            function getUserFailed(error){
                deferred.reject(error);
            }

            return deferred.promise;

        }

        function deleteUser(query){
            var deferred = $q.defer();

            demoApi.deleteUser(query).$promise.then(deleteComplete).catch(deleteFailed);
            function deleteComplete(response) {
                deferred.resolve(response);
            }

            function deleteFailed(error) {
                deferred.reject(error)
            }
            return deferred.promise;
        }

        function getUserDetails(){

            var deferred = $q.defer();
            demoApi.getUserRecored().$promise.then(searchDetailsComplete).catch(searchDetailsFailed);

            function searchDetailsComplete(response) {

                deferred.resolve(response);
            }

            function searchDetailsFailed(error) {
                deferred.reject(error)
            }
            return deferred.promise;

        }
    }

})();
/**
 * Created by Ashish Lamse on 22/9/16.
 */

(function(){
    angular.module('changepasswordModule')
        .factory('changepasswordService',changepasswordService);
    changepasswordService.$inject=['demoApi','$q'];
    function changepasswordService(demoApi,$q){
        var service={
            changePassword:changePassword
        };
        return service;

        function changePassword(username){
            var deffered=$q.defer();
            demoApi.changePassword(username).$promise.then(changeSuccess).catch(changeFailed);

            function changeSuccess(result){
                deffered.resolve(result);
            }

            function changeFailed(error){
                deffered.reject(error);
            }

            return deffered.promise;
        }
    }
})();
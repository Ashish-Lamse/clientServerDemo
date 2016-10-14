/**
 * Created by Ashish Lamse on 22/9/16.
 */

(function(){
    angular.module('changepasswordModule')
        .factory('changepasswordService',changepasswordService);
    changepasswordService.$inject=['demoApi','$q'];

    function changepasswordService(demoApi,$q){

        var deffered=$q.defer();

        var service={
            changePassword:changePassword
        };
        return service;


        function changePassword(username){
            demoApi.changePassword().$promise.then(changeSuccess).catch(changeFailed);

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
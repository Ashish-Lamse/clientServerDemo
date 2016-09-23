/**
 * Created by Ashish Lamse on 22/9/16.
 */
(function(){
    angular.module('forgotpasswordModule')
        .factory('forgotpasswordService',forgotpasswordService);

    forgotpasswordService.$inject=['demoApi','$q'];
    function forgotpasswordService(demoApi,$q){
            var service={
                forgotPassword:forgotPassword
            };
        return service;

        function forgotPassword(username){
            var deffered=$q.defer();

            demoApi.forgotPassword(username).$promise.then(validUser).catch(invalidUser);

            function validUser(result){
                deffered.resolve(result);
            }
            function invalidUser(error){
                deffered.reject(error);
            }
            return deffered.promise;
        }
    }
})();

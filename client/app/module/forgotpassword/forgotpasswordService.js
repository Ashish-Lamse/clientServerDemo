/**
 * Created by Ashish Lamse on 22/9/16.
 */
(function(){
    angular.module('forgotpasswordModule')
        .factory('forgotpasswordService',forgotpasswordService);

    forgotpasswordService.$inject=['demoApi','$q'];
    function forgotpasswordService(demoApi,$q){
            var deffered=$q.defer();
            var service={
                forgotPassword:forgotPassword,
                forgotPasswordMail:forgotPasswordMail

            };
        return service;
        function forgotPasswordMail(data){
            demoApi.forgotPasswordMail(data).$promise.then(getSuccessMailData).catch(getFailureMailData);

            function getSuccessMailData(result){
                deffered.resolve(result)
            }

            function getFailureMailData(failure){
                deffered.reject(failure)
            }

            return deffered.promise;
        }

        function forgotPassword(username){


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

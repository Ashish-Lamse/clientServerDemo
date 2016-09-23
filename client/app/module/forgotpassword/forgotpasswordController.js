/**
 * Created by Ashish Lamse on 21/9/16.
 */
(function(){
    angular.module('forgotpasswordModule')
        .controller('forgotpasswordController',forgotpasswordController);
    forgotpasswordController.$inject=['forgotpasswordService','$location','$rootScope','$rootScope'];

    function forgotpasswordController(forgotpasswordService,$location,$rootScope){
        var fc=this;

        fc.forgotPassword=forgotPassword;

        function forgotPassword(username){

            forgotpasswordService.forgotPassword({username:username}).then(function(res){
                    if(res.status){
                        $rootScope.username=username;
                        $location.path('/changepassword')
                    }
                else {
                        fc.error = 'Username is not matched please give correct username';
                    }
            });
        }
    }
})();
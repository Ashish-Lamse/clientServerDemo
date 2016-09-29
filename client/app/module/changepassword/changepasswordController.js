/**
 * Created by Ashish Lamse on 22/9/16.
 */

(function(){
   angular.module('changepasswordModule')
       .controller('changepasswordController',changepasswordController);
    changepasswordController.$inject=['changepasswordService','$rootScope','$location'];

    function changepasswordController(changepasswordService,$rootScope,$location){
        var cc=this;
        cc.currentUsername=$rootScope.username;
        cc.resetPassword=resetPassword;

        function resetPassword(){
            if (cc.password != cc.resetP) {
                cc.IsMatch=true;
                return false;
            }
            else {
                cc.IsMatch=false;
                changepasswordService.changePassword({username:cc.currentUsername,password:cc.password}).then(function(res){
                   if(res.status){
                      alert('Your password has changed successfully...!')
                       $location.path('/login')
                       }
                    else {
                       console.log('Error'+res);
                   }
                });
            }

        }

    }
})();
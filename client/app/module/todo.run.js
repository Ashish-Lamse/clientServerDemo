(function() {
    'use strict';

    //Declare app level run configurations here
    angular
        .module('demoApp')
        .run(appRun);

    appRun.$inject = ['$rootScope', '$state', '$stateParams', '$cookies','AclService'];

    function appRun($rootScope, $state, $stateParams, $cookies,AclService) {

        $rootScope.checkAclService=function(a){

           if(a===1){
               var aclData = {
                   user: ['state2', 'login','forgotpassword','changepassword'],
                   admin: ['state1', 'state2', 'login','forgotpassword','changepassword']
               };
               AclService.setAbilities(aclData);
               // Attach the member role to the current user
               AclService.attachRole('admin');
           }

            else {
               var aclData = {
                   user: ['state2', 'login','forgotpassword','changepassword'],
                   admin: ['state1', 'state2', 'login','forgotpassword','changepassword']
               };
               AclService.setAbilities(aclData);
               // Attach the member role to the current user
               AclService.attachRole($rootScope.currentUser.role);
           }
        };

        $rootScope.logout = function() {
            $cookies.remove('todoUSer');
            $rootScope.isAuthenticated=false;
            console.log('Ya i am working fine');
            $state.go('login');
        };

        $rootScope.checkAclService(1);

    }
}());
'use strict';

angular.module('login.module')

    .controller('LoginController',
        ['$rootScope', '$location', 'AuthenticationService',
            function ( $rootScope, $location, AuthenticationService) {

                $rootScope.currentWindow='Login Window';
                // reset login status
                AuthenticationService.ClearCredentials();
                var lc=this;

                lc.login = function (email,password) {
                                    lc.dataLoading = true;
                                    var query={username:email,password:password};
                                    AuthenticationService.Login(query).then(function (response){
                                            if(response.isAuthenticated){
                                                AuthenticationService.SetCredentials(response.email,response.password);
                                                $location.path('/state2');
                                                lc.dataLoading = false;
                                            }

                                            else {

                                                lc.error = "Login failed Username or password wrong";
                                                lc.dataLoading = false;
                                            }

                                    })

                };


            }]);
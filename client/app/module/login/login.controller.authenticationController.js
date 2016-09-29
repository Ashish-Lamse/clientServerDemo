'use strict';

angular.module('login.module')

    .controller('LoginController',
        ['$rootScope', '$location', 'AuthenticationService','$cookies','$timeout','$q',
            function ( $rootScope, $location, AuthenticationService,$cookies,$timeout,$q) {


                $rootScope.currentWindow='Login Window';
                $rootScope.currentUser={role:'user'};



                // reset login status
                AuthenticationService.ClearCredentials();
                var lc=this;

                lc.login = function (email,password) {
                                    var dffered=$q.defer();

                                    lc.dataLoading = true;
                                    var query={username:email,password:password};
                                    AuthenticationService.Login(query).then(function (response){
                                            if(response.isAuthenticated){
                                                $rootScope.isAuthenticated=true;

                                                var user={
                                                    userid:response.data[0]._id,
                                                    firstname:response.data[0].firstname,
                                                    lastname:response.data[0].lastname,
                                                    email:response.data[0].email,
                                                    role:response.data[0].role
                                                };
                                                $cookies.put('todoUSer',user);

                                                $rootScope.currentUser=user;
                                                AuthenticationService.SetCredentials(response.email,response.password);


                                                $rootScope.checkAclService();

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
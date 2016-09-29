/**
 * Created by Ashish Lamse on 7/9/16.
 */

(function(){
    angular.module('dashboardModule')
        .controller('dashboardController',dashboardController);
        dashboardController.$inject=['$rootScope','dashboardService','$uibModal','$location'];

        function dashboardController($rootScope,dashboardService,$uibModal,$location){

            var dc=this;
            $rootScope.currentWindow='Dashboard Window';


            dc.deleteUser=function(id){

                    $uibModal.open({
                        templateUrl: 'partials/deleteUser.html',
                        controller: function($scope,$uibModalInstance){
                            $scope.ok=function(){
                                var query = {id:id};

                                 dashboardService.deleteUser(query).then(function(res){
                                 if(res){
                                     dc.getAllUser();
                                 }
                                 });

                                $uibModalInstance.dismiss('cancel');
                            };

                            $scope.can=function(){
                                $uibModalInstance.dismiss('cancel');
                            }
                        }
                    });



            };

            dc.getUser=function(id){

                $uibModal.open({
                    templateUrl:'partials/editUser.html',
                    controller:function($scope,$uibModalInstance){
                        $scope.user={firstName:'',lastName:''};
                        var query = {id:id};

                        dashboardService.getUser(query).then(function(res){
                            if(res){
                                console.log(res);
                                $scope.user.firstName=res[0].firstname;
                                $scope.user.lastName=res[0].lastname;
                                $scope.id=res[0]._id;

                                console.log("response id"+ $scope.id)
                            }
                        });

                        $scope.ok=function(firstname,lastname){
                            var query = {firstname:firstname,lastname:lastname,id:$scope.id};

                            dashboardService.editUser(query).then(function(res){
                               if(res){
                                   dc.getAllUser();
                               }
                            });

                            $uibModalInstance.dismiss('cancel');
                        };

                        $scope.cancle=function(){
                            $uibModalInstance.dismiss('cancel');
                        }
                    }
                });

            };

            dc.getAllUser= function getAllUser(){
                if($rootScope.isAuthenticated)
                {
                    dashboardService.getUserDetails().then(function(res){
                        if(res){
                            dc.allUsersData=res;
                        }
                    });
                }

                else {
                    $location.path('/login');
                }
            };

            dc.getAllUser();

        }

})();
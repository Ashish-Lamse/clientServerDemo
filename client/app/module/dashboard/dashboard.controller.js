/**
 * Created by Ashish Lamse on 7/9/16.
 */

(function(){
    angular.module('dashboardModule')
        .controller('dashboardController',dashboardController);
        dashboardController.$inject=['$scope','dashboardService'];

        function dashboardController($scope,dashboardService){

            $scope.deleteUser=function(firstname,lastname){

                var query = {firstName:firstname, lastName: lastname};

                dashboardService.deleteUser(query).then(function(res){
                    if(res){
                       console.log("say recored has deleted")
                    }
                })
            };

            $scope.getAllUser= function getAllUser(){
                dashboardService.getUserDetails().then(function(res){
                    if(res){
                        $scope.allUsersData=res;
                    }
                })
            };

            $scope.getAllUser();

        }

})();
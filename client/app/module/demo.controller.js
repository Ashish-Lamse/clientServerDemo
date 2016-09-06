/**
 * Created by Ashish Lamse on 6/9/16.
 */


(function(){
    angular.module('demoApp')

        .controller('demoController',demoController);
        demoController.$inject=['$scope','demoApi'];

        function demoController($scope,demoApi){

            $scope.master = {firstName: "John", lastName: "Doe"};

            $scope.insertInfo = function() {
                $scope.user={firstName:"John", lastName: "Doe"};

                var query = {firstName:"John", lastName: "Doe"};

                demoApi.insert(query);/*.then(function(response){
                    console('I am also working f9');
                });*/

            };
            $scope.insertInfo();
        }
})();

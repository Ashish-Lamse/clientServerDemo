/**
 * Created by Ashish Lamse on 6/9/16.
 */


(function(){
    angular.module('demoApp')

        .controller('demoController',demoController);
        demoController.$inject=['$scope','demoApi','$q'];

        function demoController($scope,demoApi,$q,$uibModal){

            $scope.insertInfo = function(firstname,lastname) {
                $scope.user={firstName:'',lastName:''};



                var query = {firstName:firstname, lastName: lastname};
                var deferred = $q.defer();

                demoApi.insert(query).$promise.then(saveRecoredComplete).catch(saveRecoredFailed);

                function saveRecoredComplete(response){
                    alert(response);
                }

                function saveRecoredFailed(error){
                    alert(error);
                }

                   /* if(response){
                     alert('Recored save Successfully')
                    }
                });*/

            };
            /*$scope.insertInfo();*/
        }
})();

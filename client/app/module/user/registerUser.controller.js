/**
 * Created by Ashish Lamse on 6/9/16.
 */


(function(){
    angular.module('demoApp')

        .controller('registerUserController',demoController);
        demoController.$inject=['$scope','demoApi','$q','$location','$rootScope'];

        function demoController($scope,demoApi,$q,$location,$rootScope){
            $rootScope.currentWindow='User Registration';
            $scope.insertInfo = function(firstname,lastname,email,password,role) {

                $scope.user={firstName:'',lastName:'',email:'',password:'',role:''};
                var query = {firstName:firstname, lastName: lastname,email:email,password:password,role:role};
                var deferred = $q.defer();

                demoApi.insert(query).$promise.then(saveRecoredComplete).catch(saveRecoredFailed);

                function saveRecoredComplete(response){

                    if(response.status){
                        $location.path('/state2');
                        demoApi.mailSend({_to:email,_from:'ashish.lamse@gmail.com',name:firstname+' '+lastname});
                    }

                    else{
                        $scope.exist='This email id allready exist.Please try with differnt user name.'
                    }

                }
                function saveRecoredFailed(error){
                    console.log(error);
                }
            };

        }
})();

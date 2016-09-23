/**
 * Created by Ashish Lamse on 21/9/16.
 */
// Code goes here
(function(){
    angular.module('loder-module')
        .controller('LoderController', LoderController);

    LoderController.$inject=['$scope', 'usSpinnerService', '$rootScope'];

    function LoderController($scope, usSpinnerService, $rootScope){
            $scope.startcounter = 0;
        $rootScope.startSpin = function() {
                if (!$scope.spinneractive) {
                    usSpinnerService.spin('spinner-1');
                    $scope.startcounter++;
                }
            };
        $rootScope.stopSpin = function() {
                if ($scope.spinneractive) {
                    usSpinnerService.stop('spinner-1');
                }
            };
            $scope.spinneractive = false;

            $rootScope.$on('us-spinner:spin', function(event, key) {
                $scope.spinneractive = true;
            });

            $rootScope.$on('us-spinner:stop', function(event, key) {
                $scope.spinneractive = false;
            });
        }
})();

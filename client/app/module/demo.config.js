/**
 * Created by Ashish Lamse on 6/9/16.
 */

(function(){
    angular.module('demoApp')
        .config(demoConfig);

    demoConfig.$inject=['$stateProvider', '$urlRouterProvider','$locationProvider'];

    function demoConfig($stateProvider, $urlRouterProvider,$locationProvider){
        //
        // For any unmatched url, redirect to /state1
        $urlRouterProvider.otherwise("/state1");
        //
        // Now set up the states
        $stateProvider
            .state('state1', {
                url: "/state1",
                templateUrl: "partials/demo.html",
                controller:'demoController'
            });


    }
})();

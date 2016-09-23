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
        $urlRouterProvider.otherwise("/login");
        //
        // Now set up the states
        $stateProvider
            .state('state1', {
                url: "/state1",
                templateUrl: "partials/registerUser.html",
                controller:'registerUserController'
            })
            .state('state2', {
                url: "/state2",
                templateUrl: "partials/dashboard.html",
                controller:'dashboardController',
                controllerAs:'dc'
            })
            .state('login', {
                url: "/login",
                templateUrl: "partials/loginView.html",
                controller:'LoginController',
                controllerAs:'lc'
            })
            .state('forgotpassword', {
                url: "/forgotpassword",
                templateUrl: "partials/forgotpasswordView.html",
                controller:'forgotpasswordController',
                controllerAs:'fc'

            })
            .state('changepassword', {
                url: "/changepassword",
                templateUrl: "partials/change-password.html",
                controller:'changepasswordController',
                controllerAs:'cc'

            });

        $locationProvider.html5Mode(true);
        $locationProvider.hashPrefix('!');
    }
})();

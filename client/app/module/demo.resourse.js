/**
 * Created by Ashish Lamse on 6/9/16.
 */
(function(){
    'use strict';

    angular.module('demoApp')

        .factory('demoApi', demoApi);

    demoApi.$inject = ['$resource','$rootScope'];

    //clinical trail API for data calls
    function demoApi ($resource, $rootScope) {
        return $resource('/', getParamDefaults(), getActions($rootScope));
    }

    //default parameters will go here..
    var getParamDefaults = function() {
        return {
            id:'@id'
        };
    };

    //default actions and methods will go here..
    var getActions = function() {
        return {
            'insert' : {
                method : 'POST',
                url: '/insert'
            },

            'mailSend':{
                method : 'POST',
                url: '/mailSend'
            },

            'getUserRecored':{
                method : 'GET',
                isArray:true,
                url: '/getUserRecored'

            },
            'deleteUser':{
                method : 'POST',
                url: '/deleteUser'
            },
            'getUser':{
                method : 'POST',
                isArray:true,
                url: '/getUser'
            },

            'editUser':{
                method : 'POST',
                url: '/editUser'
            },

            'checkAuthentication':{
                method:'POST',
                url:'/checkAuthentication'
            },

            'forgotPassword': {
                method: 'POST',
                url: '/forgotPassword'
            },
            'changePassword':{
                method:'POST',
                url:'/changePassword'
            },

            'forgotPasswordMail':{
                method:'POST',
                url:'/forgotPasswordMail'
            }
        }
    }
}());
/**
 * Created by Ashish Lamse on 6/9/16.
 */

(function () {
    angular.module('demoApp')
    .factory('demoService',demoService);

    demoService.$inject=['demoApi'];

    function demoService(demoApi){

        var service = {
            insertInfo : insertInfo
        };
        return service;


        function insertInfo(query){
            demoApi.insert({q:query}).then(function(response){
               console.log('I am also working f9');
            });
        }
    }
})();
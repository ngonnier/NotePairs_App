angular.module('NotePairApp')
    .factory('ElevesService', function($resource) {
    return $resource('/resources/json/eleves.json',{},{
        update: {
            method:'PUT'
        }
    });
}).service('alerteService',function ($window) {
    this.showPopup = function (message) {
        return $window.confirm(message);
    }
});
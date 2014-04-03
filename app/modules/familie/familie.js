define(['angular', 'familie/FamilieController', 'familie/FamilieService', 'angular-route' ], function (angular, FamilieController, FamilieService) {
    "use strict";

    var familie = angular.module("familie", ['ngRoute']);

    familie.config(["$routeProvider", function($routeProvider) {
        $routeProvider.when('/familie/', {
            templateUrl: "modules/" + 'familie/familie.html',
            controller: FamilieController
        });

    }]);

    familie.service('FamilieService', FamilieService);

    return familie;
});
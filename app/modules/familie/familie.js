define(['angular', 'familie/FamilieController', 'familie/FamilieService', 'angular-route', 'firebase', 'angularfire'], function (angular, FamilieController, FamilieService) {
    "use strict";

    var familie = angular.module("familie", ['person', 'ngRoute', 'firebase']);

    familie.config(["$routeProvider", function($routeProvider) {
        $routeProvider.when('/familie/:familieId', {
            templateUrl: "modules/" + 'familie/familie.html',
            controller: FamilieController
        });

    }]);

    familie.service('FamilieService', FamilieService);

    return familie;
});
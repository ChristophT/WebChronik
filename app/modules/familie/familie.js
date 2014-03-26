define(['angular', 'familie/FamilieController', 'angular-route' ], function (angular, FamilieController) {
    "use strict";

    var familie = angular.module("familie", ['ngRoute']);

    familie.config(["$routeProvider", function($routeProvider) {
        $routeProvider.when('/familie/', {
            templateUrl: "modules/" + 'familie/familie.html',
            controller: FamilieController
        });

    }]);

    return familie;
});
define(function () {
    "use strict";

    var FamilieController = function($scope, FamilieService) {
        $scope.vater = FamilieService.aktuelleFamilie.vater;
        $scope.mutter = FamilieService.aktuelleFamilie.mutter;

        $scope.kinder = FamilieService.aktuelleFamilie.kinder;

        $scope.spaltenVorKindern = function() {
            return Math.floor((12 - (2 * $scope.kinder.length) - ($scope.spaltenBreiteZwischenKindern() * ($scope.kinder.length - 1))) / 2);
        };

        $scope.spaltenBreiteZwischenKindern = function() {
            if ($scope.kinder.length <= 2) {
                return 4;
            } else if ($scope.kinder.length <= 3) {
                return 2;
            }
            return 0;
        };

        $scope.isLetztesKind = function(kind) {
            return kind === $scope.kinder[$scope.kinder.length - 1];
        };
    };

    FamilieController.$inject = ['$scope', 'FamilieService'];

    return FamilieController;
});
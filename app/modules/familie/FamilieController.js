define(function () {
    "use strict";

    var FamilieController = function($scope) {
        $scope.vater = 'ich';
        $scope.mutter = 'du';

        $scope.kinder = ['Silvie', 'Gwen'];

        $scope.spaltenVorKindern = function() {
            return Math.floor((12 - (2 * $scope.kinder.length)) / 2);
        };
    };

    FamilieController.$inject = ['$scope'];

    return FamilieController;
});
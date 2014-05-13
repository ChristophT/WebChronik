define(function () {
    "use strict";

    var FamilieController = function($scope, $routeParams, FamilieService) {
        var aktuelleFamilieId;

        aktuelleFamilieId = $routeParams.familieId;

        FamilieService.getFamilie(aktuelleFamilieId).then(function(familieAusService) {
            $scope.familie = familieAusService;
        });

        function isFamilieDefined() {
            return $scope.familie && $scope.familie.Kinder;
        }

        $scope.spaltenVorKindern = function() {
            if (isFamilieDefined()) {
                return Math.floor((12 - (2 * $scope.familie.Kinder.length) - ($scope.spaltenBreiteZwischenKindern() * ($scope.familie.Kinder.length - 1))) / 2);
            }
            return 1;
        };

        $scope.spaltenBreiteZwischenKindern = function() {
            if (isFamilieDefined()) {
                if ($scope.familie.Kinder.length <= 2) {
                    return 4;
                } else if ($scope.familie.Kinder.length <= 3) {
                    return 2;
                }
            }
            return 0;
        };

        $scope.isLetztesKind = function(kind) {
            return isFamilieDefined() && kind === $scope.familie.Kinder[$scope.familie.Kinder.length - 1];
        };
    };

    FamilieController.$inject = ['$scope', '$routeParams', 'FamilieService'];

    return FamilieController;
});
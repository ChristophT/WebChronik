define(function () {
    "use strict";

    var FamilieController = function($scope, $routeParams, FamilieService, PersonService) {
        var aktuelleFamilieId;

        aktuelleFamilieId = $routeParams.familieId;

        FamilieService.getFamilie(aktuelleFamilieId).then(function(familieAusService) {
            $scope.familie = familieAusService;
        });

        function isFamilieDefined() {
            return $scope.familie && $scope.familie.Kinder;
        }

        $scope.getPerson = function(id) {
            return PersonService.getPerson(id);
        };

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

        $scope.isVerheiratet = function() {
            var hochzeitsdatum = $scope.getHochzeitsdatum();

            return hochzeitsdatum && hochzeitsdatum.length > 0;
        };

        $scope.getHochzeitsdatum = function() {
            if (! $scope.familie) {
                return undefined;
            }
            return baueDatum($scope.familie.Hochzeitstag,
                $scope.familie.Hochzeitsmonat,
                $scope.familie.Hochzeitsjahr);
        };

        $scope.isGeschieden = function() {
            if (! $scope.familie) {
                return undefined;
            }

            return $scope.familie.geschieden;
        };

        $scope.getScheidungsdatum = function() {
            if (! $scope.familie) {
                return undefined;
            }
            return baueDatum($scope.familie.Scheidungstag,
                $scope.familie.Scheidungsmonat,
                $scope.familie.Scheidungsjahr);
        };

        function baueDatum(tag, monat, jahr) {
            var datum = '';
            function addDot() {
                if (datum) {
                    datum = datum + '.';
                }
            }

            if (tag) {
                datum = tag;
            }
            if (monat) {
                addDot();
                datum = datum + monat;
            } else if (tag) {
                addDot();
                datum = datum + '?';
            }
            if (jahr) {
                addDot();
                datum = datum + jahr;
            }
            return datum;
        }
    };

    FamilieController.$inject = ['$scope', '$routeParams', 'FamilieService', 'PersonService'];

    return FamilieController;
});
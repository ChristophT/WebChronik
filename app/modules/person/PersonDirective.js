define(function () {
    "use strict";

    var PersonDirective;

    PersonDirective = function (FamilieService) {
        return {
            restrict: 'E',
            templateUrl: 'modules/person/PersonTemplate.html',
            scope: {
                person: '=',
                familie: '=',
                rolle: '='
            },
            controller: function($scope) {
                $scope.isKind = function() {
                    console.log($scope.rolle);
                    return $scope.rolle === 'kind';
                };

                $scope.getKindFamilie = function() {
                    if ($scope.kindFamilie) {
                        return $scope.kindFamilie;
                    }
                    if ($scope.rolle === 'vater' || $scope.rolle === 'mutter') {
                        $scope.kindFamilie = FamilieService.getKindFamilie($scope.person) || null;
                        return $scope.kindFamilie;
                    }
                    return null;
                };

                $scope.getElternFamilien = function() {
                    if ($scope.elternFamilien) {
                        return $scope.elternFamiilien;
                    }
                    if ($scope.rolle === 'kind') {
                        $scope.elternFamiilien = FamilieService.getElternFamiilien($scope.person) || null;
                        return $scope.elternFamiilien;
                    }
                };

                $scope.hatElternFamilien = function() {
                    return $scope.getElternFamilien() && $scope.getElternFamilien().length > 0;
                };

                function getGeburtsname(person) {
                    if (person.Geburtsname) {
                        return person.Geburtsname;
                    }
                    return person.Nachname;
                }

                $scope.getPartnerGeburtsname = function(elternFamilie) {
                    if (elternFamilie.frau === $scope.person) {
                        return getGeburtsname(elternFamilie.mann);
                    }
                    if (elternFamilie.mann === $scope.person) {
                        return getGeburtsname(elternFamilie.frau);
                    }
                    return elternFamilie.FamilienName;
                };

                $scope.getAndereEhen = function() {
                    if ($scope.rolle === 'vater' || $scope.rolle === 'mutter') {
                        return FamilieService.getAndereEhen($scope.person, $scope.familie);
                    }
                };

                $scope.hatAndereEhen = function() {
                    if ($scope.rolle === 'vater' || $scope.rolle === 'mutter') {
                        var andereEhen = FamilieService.getAndereEhen($scope.person, $scope.familie);
                        return andereEhen && andereEhen.length > 0;
                    }
                    return false;
                };
            }
        };
    };

    PersonDirective.$inject = ['FamilieService'];

    return PersonDirective;
});
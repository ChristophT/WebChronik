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
                    return $scope.rolle === 'kind';
                };

                function isElternteil() {
                    return $scope.rolle === 'vater' || $scope.rolle === 'mutter';
                }

                $scope.getKindFamilie = function() {
                    if ($scope.kindFamilie) {
                        return $scope.kindFamilie;
                    }
                    if (isElternteil()) {
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

                $scope.getZuvorName = function() {
                    var zuvorName = '';

                    if (!$scope.person) {
                        return undefined;
                    }
                    if ($scope.hatAndereEhen()) {
                        var alleEhen = FamilieService.getElternFamiilien($scope.person);

                        if (alleEhen[alleEhen.length - 1].id !== $scope.familie.id) {
                            zuvorName = '(zuvor ' + $scope.familie.FamilienName + ') ';
                        }
                    }

                    return zuvorName;
                };

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
                    if (isElternteil()) {
                        return FamilieService.getAndereEhen($scope.person, $scope.familie);
                    }
                };

                $scope.hatAndereEhen = function() {
                    if (isElternteil()) {
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
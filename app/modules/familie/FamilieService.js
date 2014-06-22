define(['angular', 'sjcl', 'angularfire'], function (angular, sjcl) {
    "use strict";

    var FamilieService = function ($firebase, $q, PersonService) {
        var familien = {}, getFamilie, loadFamilien, warteliste = {}, getKindFamilie, getElternFamiilien, getAndereEhen;
        var familenRef = new Firebase('https://resplendent-fire-8728.firebaseio.com/familien');

        function kindEinsortieren(familie, kind, kindId) {
            if (!familie.kindMap) {
                familie.kindMap = {};
            }
            familie.kindMap[kindId] = kind;
            familie.kindListe = [];
            angular.forEach(familie.Kinder, function(kindId) {
                if (familie.kindMap[kindId]) {
                    familie.kindListe.push(familie.kindMap[kindId]);
                }
            });

        }

        function resolvePersonen(familie) {
            if (!familie.mann && familie.MannId) {
                PersonService.getPerson(familie.MannId).then(function(person) {
                    familie.mann = person;
                });
            }
            if (!familie.frau && familie.FrauId) {
                PersonService.getPerson(familie.FrauId).then(function(person) {
                    familie.frau = person;
                });
            }

            angular.forEach(familie.Kinder, function(kindId) {
                PersonService.getPerson(kindId).then(function(person) {
                    kindEinsortieren(familie, person, kindId);
                });
            });
        }

        loadFamilien = function () {
            var familienQuelle = $firebase(familenRef);

            familienQuelle.$on('loaded', function (snap) {
                if (angular.isArray(snap)) {
                    for (var snapFamilieId in snap) {
                        if (snap.hasOwnProperty(snapFamilieId)) {
                            var klartext = sjcl.decrypt('AuGjygdfo8)%lÖI!!AWdbf#KklgklsBHJslk', snap[snapFamilieId], {}, {});
                            var familie = JSON.parse(klartext);
                            familie.id = snapFamilieId;
                            familien[snapFamilieId] = familie;

                            if (warteliste[snapFamilieId]) {
                                warteliste[snapFamilieId].resolve(familie);
                                delete warteliste[snapFamilieId];
                            }

                            resolvePersonen(familie);
                        }
                    }
                } else {
                    console.log('snap enthält nicht das erwartete Array');
                }
            });
        };

        getFamilie = function(id) {
            var deferred = $q.defer();

            if (familien[id]) {
                deferred.resolve(familien[id]);
            } else {
                if (warteliste[id]) {
                    deferred = warteliste[id];
                } else {
                    warteliste[id] = deferred;
                    loadFamilien();
                }
            }
            return deferred.promise;
        };

        getKindFamilie = function(person) {
            for (var familienId in familien) {
                if (familien.hasOwnProperty(familienId)) {
                    var familie = familien[familienId];
                    if (familie.kindMap && familie.kindMap[person.id] === person) {
                        return familie;
                    }
                }
            }
        };

        getElternFamiilien = function(person) {
            if (!person) {
                return undefined;
            }
            var elternFamilien = person.elternFamilien;
            if (!elternFamilien) {
                elternFamilien = [];
                for (var familienId in familien) {
                    if (familien.hasOwnProperty(familienId)) {
                        var familie = familien[familienId];
                        if (familie.frau === person || familie.mann === person) {
                            elternFamilien.push(familie);
                        }
                    }
                }
                person.elternFamilien = elternFamilien;
            }
            return elternFamilien;
        };

        getAndereEhen = function(person, familie) {
            var ehen = getElternFamiilien(person), andereEhen = [];
            angular.forEach(ehen, function(ehe) {
                if (ehe.id !== familie.id) {
                    andereEhen.push(ehe);
                }
            });
            return andereEhen;
        };

        loadFamilien();

        return {
            loadFamilien: loadFamilien,
            getFamilie: getFamilie,
            getKindFamilie: getKindFamilie,
            getElternFamiilien: getElternFamiilien,
            getAndereEhen: getAndereEhen
        };
    };

    FamilieService.$inject = ['$firebase', '$q', 'PersonService'];

    return FamilieService;
});
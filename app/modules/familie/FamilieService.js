define(['angular', 'sjcl', 'angularfire'], function (angular, sjcl) {
    "use strict";

    var FamilieService = function ($firebase, $q) {
        var familien = {}, getFamilie, loadFamilien, warteliste = {};
        var familenRef = new Firebase('https://resplendent-fire-8728.firebaseio.com/familien');

        loadFamilien = function () {
            var familienQuelle = $firebase(familenRef);

            familienQuelle.$on('loaded', function (snap) {
                if (angular.isArray(snap)) {
                    for (var snapFamilieId in snap) {
                        if (snap.hasOwnProperty(snapFamilieId)) {
                            var klartext = sjcl.decrypt('AuGjygdfo8)%lÖI!!AWdbf#KklgklsBHJslk', snap[snapFamilieId], {}, {});
                            familien[snapFamilieId] = JSON.parse(klartext);

                            if (warteliste[snapFamilieId]) {
                                warteliste[snapFamilieId].resolve(familien[snapFamilieId]);
                                delete warteliste[snapFamilieId];
                            }
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

        loadFamilien();

        return {
            loadFamilien: loadFamilien,
            getFamilie: getFamilie
        };
    };

    FamilieService.$inject = ['$firebase', '$q'];

    return FamilieService;
});
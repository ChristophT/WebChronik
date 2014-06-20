define(['angular', 'sjcl', 'angularfire'], function (angular, sjcl) {
    "use strict";

    var PersonService = function ($firebase, $q) {
        var personen = {}, getPerson, loadPersonen, warteliste = {};
        var personenRef = new Firebase('https://resplendent-fire-8728.firebaseio.com/personen');

        loadPersonen = function () {
            var personenQuelle = $firebase(personenRef);

            personenQuelle.$on('loaded', function (snap) {
                if (angular.isArray(snap)) {
                    for (var snapPersonId in snap) {
                        if (snap.hasOwnProperty(snapPersonId)) {
                            var klartext = sjcl.decrypt('AuGjygdfo8)%lÖI!!AWdbf#KklgklsBHJslk', snap[snapPersonId], {}, {});
                            personen[snapPersonId] = JSON.parse(klartext);
                            personen[snapPersonId].id = snapPersonId;

                            if (warteliste[snapPersonId]) {
                                warteliste[snapPersonId].resolve(personen[snapPersonId]);
                                delete warteliste[snapPersonId];
                            }
                        }
                    }
                } else {
                    console.log('snap enthält nicht das erwartete Array');
                }
            });
        };

        getPerson = function(id) {
            var deferred = $q.defer();

            if (personen[id]) {
                deferred.resolve(personen[id]);
            } else {
                if (warteliste[id]) {
                    deferred = warteliste[id];
                } else {
                    warteliste[id] = deferred;
                    loadPersonen();
                }
            }
            return deferred.promise;
        };

        loadPersonen();

        return {
            loadPersonen: loadPersonen,
            getPerson: getPerson
        };
    };

    PersonService.$inject = ['$firebase', '$q'];

    return PersonService;

});
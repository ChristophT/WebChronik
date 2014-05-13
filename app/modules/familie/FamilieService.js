define(['angularfire', 'sjcl'], function () {
    "use strict";

    var FamilieService = function ($q, $firebase) {
        var familien = {}, getFamilie;
        var familenRef = new Firebase('https://resplendent-fire-8728.firebaseio.com/familien');
        var familienQuelle = $firebase(familenRef);

        getFamilie = function(id) {
            var deferred = $q.defer();

            if (!familien[id]) {
                var zielFamilie = familienQuelle.$child(id);

                zielFamilie.$on('value', function(snap) {
                    if (snap.snapshot.value) {
                        var klartext = sjcl.decrypt('falsch!', snap.snapshot.value, {}, {}),
                            familie = JSON.parse(klartext);

                        familien[id] = familie;
                        deferred.resolve(familie);
                    } else {
                        console.log('snap.snapshot.value ist leer');
                        deferred.reject();
                    }
                });
            } else {
                deferred.resolve(familien[id]);
            }
            return deferred.promise;
        };

        familien['23'] = {
            MannId: 'ich',
            FrauId: 'du',
            Kinder: [
                {name: 'Silvie'},
                {name: 'Gwen'},
                {name: 'Nr3'},
                {name: 'Nr4'}
            ]
        };
        return {
            getFamilie: getFamilie
        };
    };

    FamilieService.$inject = ['$q', '$firebase'];

    return FamilieService;
});
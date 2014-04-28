define(function () {
    "use strict";

    var FamilieService = function () {
        var aktuelleFamilie;

        aktuelleFamilie = {
            vater: 'ich',
            mutter: 'du',
            kinder: [
                {name: 'Silvie'},
                {name: 'Gwen'},
                {name: 'Nr3'}
            ]
        };
        return {
            aktuelleFamilie: aktuelleFamilie
        };
    };

    return FamilieService;
});
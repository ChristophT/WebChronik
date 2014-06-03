define(function () {
    "use strict";

    var PersonDirective;

    PersonDirective = function (PersonService) {
        return {
            restrict: 'E',
            templateUrl: 'modules/person/PersonTemplate.html',
            scope: {
                person: '='
            }
//            link: function(scope, element, attrs) {
//                scope.$watch(attrs.personId, function(value) {
//                    PersonService.getPerson(value).then(function(personAusService) {
//                        scope.person = personAusService;
//                    });
//                });
//
//            }
        };
    };

    PersonDirective.$inject = ['PersonService'];

    return PersonDirective;
});
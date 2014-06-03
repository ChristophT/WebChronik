define(['angular', 'person/PersonDirective', 'person/PersonService', 'firebase', 'angularfire'], function (angular, PersonDirective, PersonService) {
    "use strict";

    var person = angular.module("person", ['firebase']);

    person.service('PersonService', PersonService);

    person.directive('fcPerson', PersonDirective);

    return person;
});
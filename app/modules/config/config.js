define(["angular", "config/configuration"], function(angular, configuration) {
   "use strict";

    var standardAngularModules = ["ngRoute", "familie", "person", "about", "navbar", "config"],
        standardRequireModules = ["angular", "app"],
        config = angular.module('config', function() {});



    if (configuration.useMock) {
        standardAngularModules.push("ngMockE2E");
        standardRequireModules.push("angular-mocks");
    }
    configuration.standardAngularModules = standardAngularModules;
    configuration.standardRequireModules = standardRequireModules;

    config.constant("config", configuration);

    return configuration;

});

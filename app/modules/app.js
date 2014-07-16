define(['angular', 'config/config', 'angular-route', 'familie/familie', 'person/person', 'about/about', 'navbar/navbar', 'firebase', 'angularfire', 'sjcl'], function (angular, config) {
	"use strict";

    var app = angular.module("chronik", config.standardAngularModules);

	app.config(['$httpProvider', '$routeProvider', function ($httpProvider, $routeProvider) {

		$routeProvider.otherwise({redirectTo: '/familie/439'});
	}]);

	return app;
});

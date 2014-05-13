define(['angular', 'config/config', 'angular-route', 'familie/familie', 'about/about', 'navbar/navbar', 'firebase', 'angularfire', 'sjcl'], function (angular, config) {
	"use strict";

    var app = angular.module("chronik", config.standardAngularModules);

	app.config(['$httpProvider', '$routeProvider', function ($httpProvider, $routeProvider) {

		$routeProvider.otherwise({redirectTo: '/familie/1'});
	}]);

	return app;
});

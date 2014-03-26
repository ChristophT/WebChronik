define(['angular', 'angular-route' ], function (angular) {
	"use strict";

	var about = angular.module("about", ['ngRoute']);

	about.config(["$routeProvider", function($routeProvider) {
		$routeProvider.when('/about/', {
			templateUrl: "modules/" + 'about/about.html'
		});

	}]);

	return about;
});
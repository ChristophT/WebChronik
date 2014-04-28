define(['angular', 'config/config', 'angular-route', 'familie/familie', 'about/about', 'navbar/navbar', 'firebase'], function (angular, config) {
	"use strict";

    var app = angular.module("chronik", config.standardAngularModules);

	app.config(['$httpProvider', '$routeProvider', function ($httpProvider, $routeProvider) {
		var httpLogInterceptor;

		$routeProvider.otherwise({redirectTo: '/familie/'});

		httpLogInterceptor = ['$q', function ($q) {

			function success(response) {
				console.log("Successful HTTP request. Response:", response);
				return response;
			}

			function error(response) {
				console.log("Error in HTTP request. Response:", response);

				return $q.reject(response);
			}

			return function (promise) {
				return promise.then(success, error);
			};
		}];

		$httpProvider.responseInterceptors.push(httpLogInterceptor);
	}]);

	return app;
});

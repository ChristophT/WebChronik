(function (require) {
	"use strict";
	require.config({
		paths: {
			'angular': '../../../bower_components/angular/angular',
			'angular-route': '../../../bower_components/angular-route/angular-route',
			'angular-mocks': '../../../bower_components/angular-mocks/angular-mocks',
            'sjcl': '../../../bower_components/sjcl/sjcl'
		},
		shim: {
			'angular': { deps: [], exports: 'angular' },
			'angular-route': {deps: ['angular']},
			'angular-mocks': {deps: ['angular']}
		}
	});

	require(["config/config"], function (config) {

		require(config.standardRequireModules, function (angular) {
			angular.bootstrap(document, ["app"]);
		});
	});
}(require));
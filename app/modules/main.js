(function (require) {
	"use strict";
	require.config({
		paths: {
			'angular': '../../../bower_components/angular/angular',
			'angular-route': '../../../bower_components/angular-route/angular-route',
			'angular-mocks': '../../../bower_components/angular-mocks/angular-mocks',
            'sjcl': '../../../bower_components/sjcl/sjcl',
            'firebase': '../../../bower_components/firebase/firebase',
            'angularfire': '../../../bower_components/angularfire/angularfire.min'
		},
		shim: {
			'angular': { deps: [], exports: 'angular' },
			'angular-route': {deps: ['angular']},
			'angular-mocks': {deps: ['angular']},
            'sjcl': {exports: 'sjcl'},
            'firebase': {exports: 'firebase'},
            'angularfire': {deps: ['firebase'], exports: 'angularfire'}
		}
	});

	require(["config/config"], function (config) {

		require(config.standardRequireModules, function (angular) {
			angular.bootstrap(document, ["chronik"]);
		});
	});
}(require));
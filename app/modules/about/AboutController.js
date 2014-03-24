define(function () {
	"use strict";

	var AboutController = function($scope) {
		$scope.about = 'hier steht etwas über dieses Projekt';
	};

	AboutController.$inject = ["$scope"];

	return AboutController;
});
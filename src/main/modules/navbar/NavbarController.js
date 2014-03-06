define(function () {
	"use strict";

	var NavbarController = function($scope, $location) {
		$scope.isActive = function(page) {
			return page === $location.path();
		};

	};

	NavbarController.$inject = ["$scope", '$location'];

	return NavbarController;
});
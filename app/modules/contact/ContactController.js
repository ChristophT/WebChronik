define(function () {
	"use strict";

	var ContactController = function($scope, contactService, config) {
		$scope.author = "Christoph Thelen";
		$scope.email = "thelen.christoph@gmail.com";
		$scope.homepage = "https://github.com/ChristophT/WebChronik";
		$scope.message = contactService.message;

		$scope.messageChanged = function() {
			$scope.sent = false;
		};

		$scope.sendMessage = function() {
			contactService.sendMessage();
			$scope.sent = true;
		};

		$scope.system = config.system;
	};

	ContactController.$inject = ["$scope", 'ContactService', 'config'];

	return ContactController;
});
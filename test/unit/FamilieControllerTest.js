/**
 * the controller needs to be loaded explicitly with requireJS as the normal application only registers the
 * controllers inside the route definitions, which are not evaluated during testing, so they are not known to angularJS
 */
define(["familie/FamilieController"], function(FamilieController) {

	"use strict";
	describe("the FamilieController", function () {
		var familieController, scope;

		beforeEach(function () {
			//load familie module, see http://docs.angularjs.org/api/angular.mock.inject
			module("familie");
			module("config");

			inject(["$rootScope", "$controller", function ($rootScope, $controller) {
				//instantiate the controller with a newly created scope
				scope = $rootScope.$new();
				familieController = $controller(FamilieController, {$scope: scope});
			}]);
		});


		it("should run this test", function () {
			expect(scope.vater).toBe("ich");
		});
	});

});

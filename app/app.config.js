(function(){

	'use strict';

	angular.module('surveyApp')
		.config(configBlock);

	configBlock.$inject = ['$routeProvider'];
	
	function configBlock($routeProvider) {

		$routeProvider
			.when('/', {
				templateUrl: '/survey/question.partial.html'
			})
	}

})();
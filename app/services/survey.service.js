(function(){

	'use strict';

	angular.module('surveyApp')
		.factory('surveyService', surveyService);

	surveyService.$inject = ['$log', '$resource'];

	function surveyService($log, $resource) {

		var surveyResource = $resource('http://localhost:5500/questions/:id', { id: '@id'});
		var service = {
			getQuestion: getQuestion
		};

		return service;

		////////////////////

		function getQuestion() {
			// return $http.get('data.json').then(success, failure);
			return surveyResource.query().$promise.then(success, failure);
		}

		function success(data){
			return data;
		}

		function failure(error){
			$log.error(error.status + ' - ' + error.statusText + ': ' + error.data);
		}

	}

})();
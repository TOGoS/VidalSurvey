(function(){

	'use strict';

	angular.module('surveyApp')
		.factory('surveyService', surveyService);

	surveyService.$inject = ['$log', '$resource'];

	function surveyService($log, $resource) {

		var questionsResource = $resource('http://localhost:5500/questions/:id', {id: '@id'});
		var responsesResource = $resource('http://localhost:5500/responses/:id/', {id: '@id'});
		var service = {
			getQuestion: getQuestion,
			saveResponse: saveResponse
		};

		return service;

		////////////////////

		function getQuestion() {
			return questionsResource.query().$promise.then(success, failure);
		}

		function saveResponse(response) {
			return responsesResource.save(response).$promise.then(success, failure);
		}

		function success(data){
			return data;
		}

		function failure(error){
			$log.error(error.status + ' - ' + error.statusText + ': ' + error.data);
		}

	}

})();
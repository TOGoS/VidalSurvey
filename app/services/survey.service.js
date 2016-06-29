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
			getResults: getResults,
			saveResponse: saveResponse
		};

		return service;

		////////////////////

		/**
		 * Get questions.
		 * @return {Object} - a promise.
		 */
		function getQuestions() {
			return questionsResource.query().$promise.then(success, failure);
		}

		/**
		 * Save response.
		 * @return {Object} - a promise.
		 */
		function saveResponse(response) {
			return responsesResource.save(response).$promise.then(success, failure);
		}

		/**
		 * Get results.
		 * @return {Object} - a promise.
		 */
		function getResults() {
			return responsesResource.query().$promise.then(success, failure);
		}

		/**
		 * Handle a request's successful state.
		 * @return {Object} data - the data.
		 */
		function success(data){
			return data;
		}

		/**
		 * Handle a request's failed state.
		 */
		function failure(error){
			$log.error(error.status + ' - ' + error.statusText + ': ' + error.data);
		}

	}

})();
(function(){

	'use strict';

	angular.module('surveyApp')
		.filter('resultsCount', resultsCountFilter);

	resultsCountFilter.$inject = ['$filter'];

	/** 
	 * Get number of responses to a specific question.
	 *
	 * @param {Array} data - the array containing all results
	 * @param {String} questionId - the id of the question
	 * @param {String} answerId - the id of the answer
	 * @return {Number} number of responses or {Array} the array containing all results
	 */
	function resultsCountFilter($filter) {		
		return function(data, questionId, answerId) {
			if (angular.isArray(data) && angular.isString(questionId) && angular.isString(answerId)) {
				return $filter('filter')(data, {'questionId': questionId, 'answerId': answerId}).length; 
			} else {
				return data;
			}
		}
	}

})();
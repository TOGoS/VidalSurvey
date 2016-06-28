(function(){

	'use strict';

	angular.module('surveyApp')
		.filter('resultsCount', resultsCountFilter);

	resultsCountFilter.$inject = ['$filter'];
	
	function resultsCountFilter($filter) {
		return function(data, questionId, answerId) {
			return $filter('filter')(data, {'questionId': questionId, 'answerId': answerId}).length; 
		}
	}

})();
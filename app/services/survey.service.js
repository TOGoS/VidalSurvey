(function(){

	'use strict';

	angular.module('surveyApp')
		.factory('surveyService', surveyService);

	surveyService.$inject = ['$http', '$log'];

	function surveyService($http, $log) {

		var service = {
			getQuestion: getQuestion
		};

		return service;

		////////////////////

		function getQuestion() {
			return $http.get('data.json').then(success, failure);
		}

		function success(resp){
			return resp.data;
		}

		function failure(error){
			$log.error(error.status + ' - ' + error.statusText + ': ' + error.data);
		}

	}

})();
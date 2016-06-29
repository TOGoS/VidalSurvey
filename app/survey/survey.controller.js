(function(){

	'use strict';

	angular.module('surveyApp')
		.controller('SurveyController', SurveyController);

	SurveyController.$inject = ['$log', '$location', '$route', '$filter', 'surveyService'];

	function SurveyController($log, $location, $route, $filter, surveyService) {

		var SurveyCtrl = this;

		SurveyCtrl.answerCount = answerCount;
		SurveyCtrl.answerId = '';
		SurveyCtrl.answerPercentage = answerPercentage;
		SurveyCtrl.currentQuestion = {};
		SurveyCtrl.displayResults = false;
		SurveyCtrl.results = [];
		SurveyCtrl.saveResponse = saveResponse;
		SurveyCtrl.startOver = startOver;

		activate();

		////////////////////

		/**
		 * Activate controller
		 */
		function activate(){
			$log.debug('SurveyCtrl has been activated.');
			
			getQuestion().then(function(){
				$log.debug(SurveyCtrl.currentQuestion);
			});
		}

		/**
		 * Get question 
		 * @return {Object} - the promise.
		 */
		function getQuestion() {
			return surveyService.getQuestions().then(function(data){
				// Set first item as default currentQuestion
				// for now to make app a single quesiton survey
				SurveyCtrl.currentQuestion = data[0]; 							  
			});	
		}

		/**
		 * Save user response to current question
		 * @return {Object} - the promise.
		 */
		function saveResponse() {
			var answerId = SurveyCtrl.answerId;
			var questionId = SurveyCtrl.currentQuestion.id;
			var response = {'id': '', 'questionId': questionId, 'answerId': answerId};
			
			return surveyService.saveResponse(response).then(function(data){
				displayResults();
			});
		}

		/**
		 * Get results and display them.
		 * @return {Object} - the promise.
		 */		
		function displayResults(){
			return surveyService.getResults().then(function(data){
				SurveyCtrl.results = data;
				SurveyCtrl.displayResults = true;
			});
		}

		/**
		 * Start survey over by reloading page.
		 */
		function startOver() {
			SurveyCtrl.answerId = '';
			SurveyCtrl.displayResults = false;
			$route.reload();
		}

		/**
		 * Get answer count.
		 * @return {Number} - the count.
		 */
		function answerCount(questionId, answerId) {
			return $filter('resultsCount')(SurveyCtrl.results, questionId, answerId);
		}

		/**
		 * Get answer percentage.
		 * @return {Number} - the percentage.
		 */
		function answerPercentage(questionId, answerId) {
			var count = $filter('resultsCount')(SurveyCtrl.results, questionId, answerId);
			var length = SurveyCtrl.results.length;
			return (count/length).toFixed(2) * 100;
		}

	}

})();
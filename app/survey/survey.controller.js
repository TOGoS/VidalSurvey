(function(){

	'use strict';

	angular.module('surveyApp')
		.controller('SurveyController', SurveyController);

	SurveyController.$inject = ['$log', '$location', '$route', '$filter', 'surveyService'];

	function SurveyController($log, $location, $route, $filter, surveyService) {

		var SurveyCtrl = this;

		SurveyCtrl.answerPercentage = answerPercentage;
		SurveyCtrl.answerCount = answerCount;
		SurveyCtrl.answerId = '';
		SurveyCtrl.currentQuestion = {};
		SurveyCtrl.displayResults = false;
		SurveyCtrl.results = [];
		SurveyCtrl.saveResponse = saveResponse;
		SurveyCtrl.startOver = startOver;

		activate();

		////////////////////

		function activate(){
			$log.debug('SurveyCtrl has been activated.');
			
			getQuestion().then(function(){
				// $log.debug(SurveyCtrl.currentQuestion);
			});
		}

		function getQuestion() {
			return surveyService.getQuestion().then(function(data){
				SurveyCtrl.currentQuestion = data[0];
			});	
		}

		function saveResponse() {
			var answerId = SurveyCtrl.answerId;
			var questionId = SurveyCtrl.currentQuestion.id;
			var response = {'id': '', 'questionId': questionId, 'answerId': answerId};
			
			return surveyService.saveResponse(response).then(function(data){
				displayResults();
			});
		}

		function displayResults(){
			return surveyService.getResults().then(function(data){
				SurveyCtrl.results = data;
				SurveyCtrl.displayResults = true;
			});
		}

		function startOver() {
			SurveyCtrl.answerId = '';
			SurveyCtrl.displayResults = false;
			$route.reload();
		}

		function answerCount(questionId, answerId) {
			return $filter('resultsCount')(SurveyCtrl.results, questionId, answerId);
		}

		function answerPercentage(questionId, answerId) {
			var count = $filter('resultsCount')(SurveyCtrl.results, questionId, answerId);
			var length = SurveyCtrl.results.length;
			return (count/length).toFixed(2) * 100;
		}

	}

})();
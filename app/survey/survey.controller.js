(function(){

	'use strict';

	angular.module('surveyApp')
		.controller('SurveyController', SurveyController);

	SurveyController.$inject = ['$log', '$location', '$route', 'surveyService'];

	function SurveyController($log, $location, $route, surveyService) {

		var SurveyCtrl = this;

		SurveyCtrl.answerId = '';
		SurveyCtrl.currentQuestion = {};
		SurveyCtrl.displayResults = false;
		SurveyCtrl.saveResponse = saveResponse;
		SurveyCtrl.startOver = startOver;

		activate();

		////////////////////

		function activate(){
			$log.debug('SurveyCtrl has been activated.');
			
			getQuestion().then(function(){
				$log.debug(SurveyCtrl.currentQuestion);
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
				$log.debug(data);
				SurveyCtrl.displayResults = true;
			});
		}

		function startOver() {
			SurveyCtrl.answerId = '';
			SurveyCtrl.displayResults = false;
			$route.reload();
		}

	}

})();
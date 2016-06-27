(function(){

	'use strict';

	angular.module('surveyApp')
		.controller('SurveyController', SurveyController);

	SurveyController.$inject = ['$log', 'surveyService'];

	function SurveyController($log, surveyService) {

		var SurveyCtrl = this;

		SurveyCtrl.currentQuestion = {};
		SurveyCtrl.selectedAnswer = '';
		SurveyCtrl.saveResponse = saveResponse;

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
			$log.debug(SurveyCtrl.currentQuestion);
			$log.debug(SurveyCtrl.currentQuestion.selectedAnswer);
		}

	}

})();
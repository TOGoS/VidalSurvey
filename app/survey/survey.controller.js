(function(){

	'use strict';

	angular.module('surveyApp')
		.controller('SurveyController', SurveyController);

	SurveyController.$inject = ['$log', 'surveyService'];

	function SurveyController($log, surveyService) {

		var SurveyCtrl = this;

		SurveyCtrl.currentQuestion = {};
		SurveyCtrl.answerId = '';
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
			var questionId = SurveyCtrl.currentQuestion.id;
			var answerId = SurveyCtrl.answerId;
			var response = {'id': '', 'questionId': questionId, 'answerId': answerId};
			
			return surveyService.saveResponse(response).then(function(data){
				$log.debug('saved');
				$log.debug(data);
			});
		}

	}

})();
app.controller("dashboard", function($scope,$timeout,$rootScope,$location,ngDialog,sessionControl,basicTools,$compile,apiTools,$q) {
	var self = this;
	
	$rootScope.game = {};

	//se refresca la informacion del hotel
//	sessionControl.set('hotel',hotel);
	//la cargo en el scope
//	$rootScope.hotel = JSON.parse(sessionControl.get('hotel'));
	//se refresca la informacion del usuario
//	sessionControl.set('user',user);
	//la cargo en el scope
//	$rootScope.user = JSON.parse(sessionControl.get('user'));

	$scope.createGame = function(){
		apiTools
        .CreateGame()
        .then(function (response) {
        	console.log(response);
	    });
	}

});
app.controller("dashboard", function($scope,$timeout,$rootScope,$location,ngDialog,sessionControl,basicTools,$compile,apiTools,$q,envService,$window,$cookies) {
	var self = this;
	//Status
    var path = envService.read('pathUrl');
	$rootScope.game = {};
	$rootScope.user = {};
	//se refresca la informacion del hotel
//	sessionControl.set('hotel',hotel);
	//la cargo en el scope
//	$rootScope.hotel = JSON.parse(sessionControl.get('hotel'));
	//se refresca la informacion del usuario
//	sessionControl.set('user',user);
	//la cargo en el scope
//	$rootScope.user = JSON.parse(sessionControl.get('user'));
	
//    if ($cookies.get('haveGame')){
//	    var url = path +"#!/view_matrix";
  //      $window.location.href = url;
//	}

	$scope.createGame = function(){
		apiTools
        .createGame()
        .then(function (response) {
        	$cookies.put('haveGame',true);
        	$cookies.put('matrixGame',JSON.stringify(response.data.data));
            $cookies.put('idGame',response.data.idGame);
            var url = path +"#!/view_matrix";
            $window.location.href = url;
	    });
	}

});
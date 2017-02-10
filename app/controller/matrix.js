app.controller("matrix", function($scope,$timeout,$rootScope,$location,ngDialog,sessionControl,basicTools,$compile,apiTools,$q,envService,$window,$cookies) {
	var self = this;
	//Status
    var path = envService.read('pathUrl');

	if (!$cookies.get('haveGame')){
	    var path = envService.read('pathUrl');
	    var url = path +"#!/";
	    $window.location.href = url;
    }

    console.log($cookies.get('idGame'));
    $rootScope.matrix = JSON.parse($cookies.get('matrixGame'));

	//se refresca la informacion del hotel
//	sessionControl.set('hotel',hotel);
	//la cargo en el scope
//	$rootScope.hotel = JSON.parse(sessionControl.get('hotel'));
	//se refresca la informacion del usuario
//	sessionControl.set('user',user);
	//la cargo en el scope
//	$rootScope.user = JSON.parse(sessionControl.get('user'));

});
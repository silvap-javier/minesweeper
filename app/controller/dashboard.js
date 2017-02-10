app.controller("dashboard", function($scope,$timeout,$rootScope,$location,ngDialog,sessionControl,basicTools,$compile,apiTools,$q,envService,$window,$cookies) {
	var self = this;
	//Status
    var path = envService.read('pathUrl');
	$rootScope.game = {};
	$rootScope.user = {};
	
    if ($cookies.get('typeView')){
    	$rootScope.typeView = $cookies.get('typeView');
    }else{
    	$cookies.put('typeView','intermediate');
    	$rootScope.typeView = 'intermediate';
    }

	$scope.createGame = function(){
		apiTools
        .createGame()
        .then(function (response) {
        	$cookies.put('haveGame',true);
        	sessionControl.set('matrixGame',JSON.stringify(response.data.data));
            $cookies.put('idGame',response.data.idGame);
            var url = path +"#!/view_matrix";
            $window.location.href = url;
	    });
	}

});
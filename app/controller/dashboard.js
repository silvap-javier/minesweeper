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


	$scope.createGameCustom = function(){
        $cookies.put('typeView','custom');
        $rootScope.typeView = 'intermediate';
        apiTools
        .createGame()
        .then(function (response) {
            $cookies.put('haveGame',true);
            $cookies.put('idGame',response.data.idGame);
            $cookies.put('username',response.data.username);
            $cookies.put('mines',response.data.mines);
            var url = path +"#!/";
            $window.location.href = url;
        });
	}

});
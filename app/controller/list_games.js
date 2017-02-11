app.controller("list_games", function($scope,$timeout,$rootScope,$location,ngDialog,sessionControl,basicTools,$compile,apiTools,$q,envService,$window,$cookies) {
	var self = this;
	//Status
    var path = envService.read('pathUrl');
	$rootScope.game = {};
	$rootScope.user = {};

	apiTools
        .getGames()
        .then(function (response) {
        	$scope.games = response.data.data;
	    });

	$scope.load_game = function(id){
		$cookies.put('haveGame',true);
		$cookies.put('idGame',id);
		var url = path +"#!/";
        $window.location.href = url;
	}
});
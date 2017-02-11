app.controller("list_games", function($scope,$timeout,$rootScope,$location,ngDialog,sessionControl,basicTools,$compile,apiTools,$q,envService,$window,$cookies) {
	var self = this;
	//Status
    var path = envService.read('pathUrl');
	$rootScope.game = {};
	$rootScope.user = {};

});
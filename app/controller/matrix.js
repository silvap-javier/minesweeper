app.controller("matrix", function($scope,$timeout,$rootScope,$location,ngDialog,sessionControl,basicTools,$compile,apiTools,$q,envService,$window,$cookies) {
	var self = this;
	//Status
    var path = envService.read('pathUrl');

    var path = envService.read('pathUrl');
	$rootScope.game = {};
	$rootScope.user = {};

    if ($cookies.get('typeView')){
    	$rootScope.typeView = $cookies.get('typeView');
    }else{
    	$cookies.put('typeView','intermediate');
    	$rootScope.typeView = 'intermediate';
    }

	if (!$cookies.get('haveGame')){
	    apiTools
        .createGame()
        .then(function (response) {
        	$cookies.put('haveGame',true);
        	sessionControl.set('matrixGame',JSON.stringify(response.data.data));
            $cookies.put('idGame',response.data.idGame);
		    $rootScope.matrix = JSON.parse(sessionControl.get('matrixGame'));
	    });
    }else{
    	$rootScope.matrix = JSON.parse(sessionControl.get('matrixGame'));
    }


    $scope.handleClick = function(evt,row,col) {
    	console.log(row);
    	console.log(col);
    	console.log($rootScope.matrix);
	    switch(evt.which) {
	        case 1:
	            console.log('izquierdo');
	            break;
	        case 2:
	            // in case you need some middle click things
	            break;
	        case 3:
	        	self.markFlag(row,col);
	            break;
	    }
	}

	this.markFlag = function(row_mark,col_mark){
		for(row in $rootScope.matrix){
			if (row == row_mark){
				for (col in $rootScope.matrix[row]){
					if (col == col_mark){
						$rootScope.matrix[row][col].status = 'flag';
					}
				}
			}
		}
	}
	//se refresca la informacion del hotel
//	sessionControl.set('hotel',hotel);
	//la cargo en el scope
//	$rootScope.hotel = JSON.parse(sessionControl.get('hotel'));
	//se refresca la informacion del usuario
//	sessionControl.set('user',user);
	//la cargo en el scope
//	$rootScope.user = JSON.parse(sessionControl.get('user'));

});
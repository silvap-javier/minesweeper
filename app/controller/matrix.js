app.controller("matrix", function($scope,$timeout,$rootScope,$location,ngDialog,sessionControl,basicTools,$compile,apiTools,$q,envService,$window,$cookies) {
	var self = this;
	//Status
    var path = envService.read('pathUrl');
    $rootScope.runingTime = false;
    $rootScope.tools = {};
	$rootScope.tools.mine = 0;
	$rootScope.game = {};
	$rootScope.user = {};

    if ($cookies.get('typeView')){
    	$rootScope.typeView = $cookies.get('typeView');
    }else{
    	$cookies.put('typeView','intermediate');
    	$rootScope.typeView = 'intermediate';
    }

    $scope.handleClick = function(evt,row,col) {
    	if (!$rootScope.runingTime){
    		self.time('start');
    	}
	    switch(evt.which) {
	        case 1:
	            self.showBlock(row,col);
	            sessionControl.set('matrixGame',JSON.stringify($rootScope.matrix));
	            break;
	        case 2:
	            // in case you need some middle click things
	            break;
	        case 3:
	        	self.markFlag(row,col);
	        	sessionControl.set('matrixGame',JSON.stringify($rootScope.matrix));
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

	this.showBlock = function(row_mark,col_mark){
		for(row in $rootScope.matrix){
			if (row == row_mark){
				for (col in $rootScope.matrix[row]){
					if (col == col_mark){
						if ($rootScope.matrix[row][col].value != 'M'){
							$rootScope.matrix[row][col].status = 'nr';
							$('#b-'+$rootScope.matrix[row][col].row+'-'+$rootScope.matrix[row][col].col).html($rootScope.matrix[row][col].value);
						}else{
							self.markAllMines();
							break;
						}
					}
				}
			}
		}
	}

	this.markAllMines = function(){
		for(row in $rootScope.matrix){
			for (col in $rootScope.matrix[row]){
				if ($rootScope.matrix[row][col].value == 'M'){
					$rootScope.matrix[row][col].status = 'mine';
				}
			}
		}
		self.time('clear');
	}

	this.cleanTable = function(){
		for(row in $rootScope.matrix){
			for (col in $rootScope.matrix[row]){
				$('#b-'+$rootScope.matrix[row][col].row+'-'+$rootScope.matrix[row][col].col).html('');
			}
		}
	}

	this.time = function(action){
		switch(action) {
		    case 'start':
		        $('.time-game')[0].start();
    			$rootScope.runingTime = true;
		        break;
		   	case 'clear':
		        $('.time-game')[0].clear();
    			$rootScope.runingTime = false;
		        break;
		} 
	}

	$scope.createGame = function(){
		apiTools
        .createGame()
        .then(function (response) {
        	$cookies.put('haveGame',true);
        	sessionControl.set('matrixGame',JSON.stringify(response.data.data));
            $cookies.put('idGame',response.data.idGame);
            $cookies.put('mines',response.data.mines);
            $rootScope.tools.mine = $cookies.get('mines');
            $rootScope.matrix = JSON.parse(sessionControl.get('matrixGame'));
            self.cleanTable();
            self.time('clear');
	    });
	}

	$scope.changeNivel = function(nivel){
		switch(nivel) {
		    case 'beginner':
		        break;
		   	case 'intermediate':
		        break;
		    case 'expert':
		        break
		} 
    }

	if (!$cookies.get('haveGame')){
		$scope.createGame();
    }else{
    	$rootScope.matrix = JSON.parse(sessionControl.get('matrixGame'));
    }

});
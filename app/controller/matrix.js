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
    	$cookies.put('typeView','beginner');
    	$rootScope.typeView = 'beginner';
    }

    if ($cookies.get('time')){
    	$rootScope.tools.time = $cookies.get('time');
    }else{
    	$cookies.put('time',0);
    	$rootScope.tools.time = 0;
    }

    $scope.handleClick = function(evt,row,col) {
    	if (!$rootScope.runingTime){
    		self.time('start');
    	}
	    switch(evt.which) {
	        case 1:
	        	if ($rootScope.game.status){
		            self.showBlock(row,col);
		            sessionControl.set('matrixGame',JSON.stringify($rootScope.matrix));
		            self.updateGame();
	        	}
	            break;
	        case 2:
	            // in case you need some middle click things
	            break;
	        case 3:
	        	if ($rootScope.game.status){
		        	self.markFlag(row,col);
		        	sessionControl.set('matrixGame',JSON.stringify($rootScope.matrix));
		        	self.updateGame();
	        	}
	            break;
	    }
	}

	this.markFlag = function(row_mark,col_mark){
		for(row in $rootScope.matrix){
			if (row == row_mark){
				for (col in $rootScope.matrix[row]){
					if (col == col_mark){
						if ($rootScope.matrix[row][col].status != 'nr'){
							if ($rootScope.matrix[row][col].status == 'flag'){
								$rootScope.matrix[row][col].status = 'questionmark';
								self.moreMines();
							}else if($rootScope.matrix[row][col].status == 'questionmark'){
								$rootScope.matrix[row][col].status = 'closed';
							}else{
								$rootScope.matrix[row][col].status = 'flag';
								self.lessMines();
							}
						}
					}
				}
			}
		}
	}

	this.lessMines = function(){
		$cookies.put('mines',parseInt($cookies.get('mines'))-1);
        $rootScope.tools.mine = $cookies.get('mines');
	}

	this.moreMines = function(){
		$cookies.put('mines',parseInt($cookies.get('mines'))+1);
        $rootScope.tools.mine = $cookies.get('mines');
	}

	this.showBlock = function(row_mark,col_mark){
		for(row in $rootScope.matrix){
			if (row == row_mark){
				for (col in $rootScope.matrix[row]){
					if (col == col_mark){
						if ($rootScope.matrix[row][col].value != 'M'){
							$rootScope.matrix[row][col].status = 'nr';
							if ($rootScope.matrix[row][col].value != 0){
								$('#b-'+$rootScope.matrix[row][col].row+'-'+$rootScope.matrix[row][col].col).html($rootScope.matrix[row][col].value);
							}else{
								$('#b-'+$rootScope.matrix[row][col].row+'-'+$rootScope.matrix[row][col].col).html('');
								self.revealedBlock($rootScope.matrix[row][col].row,$rootScope.matrix[row][col].col);																
							}
						}else{
							$rootScope.matrix[row][col].status = 'explosion';
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
					if ($rootScope.matrix[row][col].status == 'flag'){
						$rootScope.matrix[row][col].status = 'falsemine';
					}else{
						if ($rootScope.matrix[row][col].status != 'explosion'){
							$rootScope.matrix[row][col].status = 'mine';
						}
					}
				}
			}
		}
		self.time('clear');
		$scope.openDialog('view/gameover.html');
		$rootScope.game.status = false;
		$rootScope.runingTime = true;
	}
	


	this.cleanTable = function(){
		for(row in $rootScope.matrix){
			for (col in $rootScope.matrix[row]){
				$('#b-'+$rootScope.matrix[row][col].row+'-'+$rootScope.matrix[row][col].col).html('');
				$('#b-'+$rootScope.matrix[row][col].row+'-'+$rootScope.matrix[row][col].col).removeClass('nr');
			}
		}
	}

	this.markLastGame = function(){
		for(row in $rootScope.matrix){
			for (col in $rootScope.matrix[row]){
				if ($rootScope.matrix[row][col].status == "nr"){
					if ($rootScope.matrix[row][col].value != 0){
						$('#b-'+$rootScope.matrix[row][col].row+'-'+$rootScope.matrix[row][col].col).html(parseInt($rootScope.matrix[row][col].value));
					}else{
						$('#b-'+$rootScope.matrix[row][col].row+'-'+$rootScope.matrix[row][col].col).html('');
					}
				}
			}
		}
	}

	this.time = function(action){
		switch(action) {
		    case 'start':
		        $rootScope.tools.time = 0;
		        $('.time-game')[0].start();
    			$rootScope.runingTime = true;
		        break;
		   	case 'clear':
		        $rootScope.tools.time = 0;
		        $('.time-game')[0].clear();
    			$rootScope.runingTime = false;
		        break;
		} 
	}

	$rootScope.createGame = function(reload){
		apiTools
        .createGame()
        .then(function (response) {
        	$cookies.put('haveGame',true);
        	sessionControl.set('matrixGame',JSON.stringify(response.data.data));
            $cookies.put('idGame',response.data.idGame);
            $cookies.put('username',response.data.username);
            $cookies.put('mines',response.data.mines);
            $rootScope.game.username = $cookies.get('username');
            $rootScope.tools.mine = $cookies.get('mines');
            $rootScope.matrix = JSON.parse(sessionControl.get('matrixGame'));
            $timeout(function(){
	            $rootScope.game.status = true;
	            self.cleanTable();
	            self.time('clear');
		    }, 100);

		    if (reload){
		    	var url = path +"#!/";
        		$window.location.href = url;
		    }

	    });
	}

	$scope.changeNivel = function(nivel){
		switch(nivel) {
		    case 'beginner':
		    	$rootScope.game.row = 8;
		    	$rootScope.game.col = 8;
		    	$rootScope.game.mines = 10;
		    	$cookies.put('typeView','beginner');
		    	$rootScope.typeView = $cookies.get('typeView');
		        break;
		   	case 'intermediate':
		   		$rootScope.game.row = 16;
		    	$rootScope.game.col = 16;
		    	$rootScope.game.mines = 40;
		    	$cookies.put('typeView','intermediate');
		    	$rootScope.typeView = $cookies.get('typeView');
		        break;
		    case 'expert':
		    	$rootScope.game.row = 16;
		    	$rootScope.game.col = 30;
		    	$rootScope.game.mines = 99;
		    	$cookies.put('typeView','expert');
		    	$rootScope.typeView = $cookies.get('typeView');
		        break
		}
		self.time('clear');
		$rootScope.createGame(false); 
    }

    this.updateGame = function(){
    	$cookies.put('time',parseInt($('timer').html())); 
		apiTools
        .updateGame()
        .then(function (response) {
	    });
    }


	if (!$cookies.get('haveGame')){
			$rootScope.createGame(false);
    }else{
    	if ($cookies.get('idGame')){
		apiTools
	        .getGame()
	        .then(function (response) {
		    	$rootScope.game.status = true;
		    	$rootScope.tools.mine = $cookies.get('mines');
            	self.time('clear');
		    	$cookies.put('time',response.data.time);
            	$rootScope.tools.time = $cookies.get('time');
		    	$timeout(function(){
			    	sessionControl.set('matrixGame',JSON.stringify(response.data.data.matrix));
			    	$rootScope.matrix = JSON.parse(sessionControl.get('matrixGame'));
		    		$timeout(self.markLastGame, 100);
		    	}, 100);
		    });
		}
    }

    $scope.openDialog = function ($template) {
        ngDialog.open({ template: $template, className: 'ngdialog-theme-default' });
    };

    this.revealedBlock = function(row_selected,col_selected){
    	self.revealedBlockLeft(row_selected,col_selected);
    	self.revealedBlockRight(row_selected,col_selected);
    	self.revealedBlockUp(row_selected,col_selected);
    	self.revealedBlockDown(row_selected,col_selected);
	}

	this.revealedBlockLeft = function(row_selected,col_selected){
		var row_start = row_selected;
		var col_start = col_selected;
		var flag = true;
		var col_move = col_start-1;
		while (flag){
			if (col_move >= 1){
				if ($rootScope.matrix[row_start][col_move].value == 0){
					$rootScope.matrix[row_start][col_move].status = 'nr';
					$('#b-'+$rootScope.matrix[row_start][col_move].row+'-'+$rootScope.matrix[row_start][col_move].col).html('');
				}else if($rootScope.matrix[row_start][col_move].value != 0 ){
					$rootScope.matrix[row_start][col_move].status = 'nr';
					$('#b-'+$rootScope.matrix[row_start][col_move].row+'-'+$rootScope.matrix[row_start][col_move].col).html(parseInt($rootScope.matrix[row_start][col_move].value));
					flag = false;
				}
			}else{
				flag = false;
			}
				col_move = col_move-1;
		}
	}

	this.revealedBlockRight = function(row_selected,col_selected){
		var row_start = row_selected;
		var col_start = col_selected;
		var flag = true;
		var col_move = col_start+1;
		while (flag){
			if (col_move >= 1 && (!angular.isUndefined($rootScope.matrix[row_start][col_move]))){
				if ($rootScope.matrix[row_start][col_move].value == 0){
					$rootScope.matrix[row_start][col_move].status = 'nr';
					$('#b-'+$rootScope.matrix[row_start][col_move].row+'-'+$rootScope.matrix[row_start][col_move].col).html('');
				}else if($rootScope.matrix[row_start][col_move].value != 0 ){
					$rootScope.matrix[row_start][col_move].status = 'nr';
					$('#b-'+$rootScope.matrix[row_start][col_move].row+'-'+$rootScope.matrix[row_start][col_move].col).html(parseInt($rootScope.matrix[row_start][col_move].value));
					flag = false;
				}
			}else{
				flag = false;
			}
				col_move = col_move+1;
		}
	}

	this.revealedBlockUp = function(row_selected,col_selected){
		var row_start = row_selected;
		var col_start = col_selected;
		var flag = true;
		var col_move = col_start;
		var row_move = row_start-1;
		while (flag){
			if (row_move >= 1 && (!angular.isUndefined($rootScope.matrix[row_move]))){
				if ($rootScope.matrix[row_move][col_move].value == 0){
					$rootScope.matrix[row_move][col_move].status = 'nr';
					$('#b-'+$rootScope.matrix[row_move][col_move].row+'-'+$rootScope.matrix[row_move][col_move].col).html('');
					self.revealedBlockLeft($rootScope.matrix[row_move][col_move].row,$rootScope.matrix[row_move][col_move].col);
					self.revealedBlockRight($rootScope.matrix[row_move][col_move].row,$rootScope.matrix[row_move][col_move].col);
				}else if($rootScope.matrix[row_move][col_move].value != 0 ){
					$rootScope.matrix[row_move][col_move].status = 'nr';
					$('#b-'+$rootScope.matrix[row_move][col_move].row+'-'+$rootScope.matrix[row_move][col_move].col).html(parseInt($rootScope.matrix[row_move][col_move].value));
					flag = false;
				}
			}else{
				flag = false;
			}
			row_move = row_move-1;
		}
	}

	this.revealedBlockDown = function(row_selected,col_selected){
		var row_start = row_selected;
		var col_start = col_selected;
		var flag = true;
		var col_move = col_start;
		var row_move = row_start+1;
		while (flag){
			if (row_move >= 1 && (!angular.isUndefined($rootScope.matrix[row_move]))){
				if ($rootScope.matrix[row_move][col_move].value == 0){
					$rootScope.matrix[row_move][col_move].status = 'nr';
					$('#b-'+$rootScope.matrix[row_move][col_move].row+'-'+$rootScope.matrix[row_move][col_move].col).html('');
					self.revealedBlockLeft($rootScope.matrix[row_move][col_move].row,$rootScope.matrix[row_move][col_move].col);
					self.revealedBlockRight($rootScope.matrix[row_move][col_move].row,$rootScope.matrix[row_move][col_move].col);
				}else if($rootScope.matrix[row_move][col_move].value != 0 ){
					$rootScope.matrix[row_move][col_move].status = 'nr';
					$('#b-'+$rootScope.matrix[row_move][col_move].row+'-'+$rootScope.matrix[row_move][col_move].col).html(parseInt($rootScope.matrix[row_move][col_move].value));
					flag = false;
				}
			}else{
				flag = false;
			}
			row_move = row_move+1;
		}
	}

});
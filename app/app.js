var app = angular.module("minesweeper", ['ngRoute','ngDialog','environment','ngCookies','angular-nicescroll','timer']);

app.config(function($routeProvider,envServiceProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "view/matrix.html",
        controller: 'matrix'
    })

    .when("/config", {
        templateUrl : "view/dashboard.html",
        controller: 'dashboard'
    })

    .when("/game_list", {
        templateUrl : "view/list_games.html",
        controller: 'list_games'
    })

	envServiceProvider.config({
      domains: {
        development: ['localhost'],
        production: ['hackzeit.co','hackzeit.co/projects/']
      },
      vars: {
        development: {
          pathUrl: 'http://localhost/minesweeper/app/',
          apiUrl: 'http://localhost/minesweeper-api/api/',
          // antoherCustomVar: 'lorem', 
          // antoherCustomVar: 'ipsum' 
        },
        production: {
          apiUrl: 'http://hackzeit.co/projects/minesweeper-api/api/',
          pathUrl: 'http://hackzeit.co/projects/minesweeper/app/',
          // antoherCustomVar: 'lorem', 
          // antoherCustomVar: 'ipsum' 
        }
        // anotherStage: { 
        //  customVar: 'lorem', 
        //  customVar: 'ipsum' 
        // } 
      }
    });
    envServiceProvider.check();
}); 
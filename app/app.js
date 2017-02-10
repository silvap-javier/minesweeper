var app = angular.module("minesweeper", ['ngRoute','ngDialog','environment','ngCookies','angular-nicescroll']);

app.config(function($routeProvider,envServiceProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "view/dashboard.html",
        controller: 'dashboard'
    })
    .when("/view_matrix", {
        templateUrl : "view/matrix.html",
        controller: 'matrix'
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
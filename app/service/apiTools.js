app.service('apiTools',apiTools);

    apiTools.$inject = ["$http","$q","$rootScope","$location","sessionControl","envService","$cookies"];

    function apiTools($http,$q,$rootScope,$location,sessionControl,envService,$cookies) {
        this.createGame = createGame;
        this.getGame = getGame;
        this.updateGame = updateGame;

        function createGame() {
            var baseApi = envService.read('apiUrl');
            var deferred = $q.defer();
            var url = baseApi + 'create_game';
            
            var config = {
                headers: {},
                params:{game:$rootScope.game}
            };

            $http.post(url, config)
                .then(function (response) {
                    deferred.resolve(response);
                })
            return deferred.promise;
        }

        function getGame() {
            var baseApi = envService.read('apiUrl');
            var deferred = $q.defer();
            var url = baseApi + 'game/'+$cookies.get('idGame');
            
            var config = {
                headers: {}
            };

            $http.get(url, config)
                .then(function (response) {
                    deferred.resolve(response);
                })
            return deferred.promise;
        }

        function updateGame(){
            var baseApi = envService.read('apiUrl');
            var deferred = $q.defer();
            var url = baseApi + 'update_game';
            $rootScope.game.id = $cookies.get('idGame');
            var config = {
                headers: {},
                params:{game:$rootScope.game,matrix:$rootScope.matrix}
            };

            $http.post(url, config)
                .then(function (response) {
                    deferred.resolve(response);
                })
            return deferred.promise;   
        }
    }
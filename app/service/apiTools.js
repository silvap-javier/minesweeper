app.service('apiTools',apiTools);

    apiTools.$inject = ["$http","$q","$rootScope","$location","sessionControl","envService"];

    function apiTools($http,$q,$rootScope,$location,sessionControl,envService) {
        this.createGame = createGame;
        this.getGame = getGame;

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
            var url = baseApi + 'game';
            
            var config = {
                headers: {},
            };

            $http.get(url, config)
                .then(function (response) {
                    deferred.resolve(response);
                })
            return deferred.promise;
        }
    }
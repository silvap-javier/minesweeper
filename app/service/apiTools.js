app.service('apiTools',apiTools);

    apiTools.$inject = ["$http","$q","$rootScope","$location","sessionControl","envService"];

    function apiTools($http,$q,$rootScope,$location,sessionControl,envService) {
        this.CreateGame = CreateGame;

        function CreateGame() {
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

    }
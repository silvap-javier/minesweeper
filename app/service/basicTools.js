app.service("basicTools", ["$http","$rootScope","$location","envService", function($http,$rootScope,$location,envService) {
    var self = this;

    this.getBasicColorBackground = function(){
        var collection = [];
        var item = [];
        item['color'] = '#4A89DC';
        collection.push(item);
        var item = [];
        item['color'] = '#4FC1E9';
        collection.push(item);
        var item = [];
        item['color'] = '#3BAFDA';
        collection.push(item);
        var item = [];
        item['color'] = '#48CFAD';
        collection.push(item);
        var item = [];
        item['color'] = '#37BC9B';
        collection.push(item);
        var item = [];
        item['color'] = '#A0D468';
        collection.push(item);
        return collection;
    }

    this.get_random_color = function(){
        var colores = self.getBasicColorBackground();
        var number =  Math.floor((Math.random() * colores.length) + 0);
        return colores[number]['color'];
    }
}]);
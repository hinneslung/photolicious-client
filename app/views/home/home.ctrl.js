(function () {
    'use strict';

    angular
        .module('app')
        .controller('HomeCtrl', HomeCtrl);

    HomeCtrl.$inject = ['$scope', '$log', '$window', '$rootScope', 'dictionary', 'apiService', 'NgMap', 'CONST'];

    /* @ngInject */
    function HomeCtrl($scope, $log, $window, $rootScope, dictionary, apiService, NgMap, CONST) {
        var vm = this;
        vm.dict = dictionary();
	    vm.getNearbyMedias = getNearbyMedias;

	    activate();

        ////////////////

        function activate() {
            $log.info("HomeCtrl is mounted");

	        initMap();
        }

	    //map

	    function initMap() {
		    NgMap.getMap().then(function(map) {
			    console.log(map.getCenter());
			    console.log('markers', map.markers);
			    console.log('shapes', map.shapes);
		    });
	    }

        function getMostViewedMedia(categoryKey) {
	        apiService.getMostViewedMedia(categoryKey, 24 * 7, 0, 16).success(function(res){
	            vm.mostViewedMedia = shuffle(res.data.slice(0, 7));
            });
        }
	    function shuffle(array) {
		    var currentIndex = array.length, temporaryValue, randomIndex;
		    while (0 !== currentIndex) {
			    randomIndex = Math.floor(Math.random() * currentIndex);
			    currentIndex -= 1;
			    temporaryValue = array[currentIndex];
			    array[currentIndex] = array[randomIndex];
			    array[randomIndex] = temporaryValue;
		    }
		    return array;
	    }
    }

})();


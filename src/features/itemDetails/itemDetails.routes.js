routes.$inject = ['$stateProvider', '$routeProvider'];

export default function routes($stateProvider, $routeProvider) {
    $stateProvider
        .state('itemDetails', {
            url: '/itemDetails/:itemID',
            template: require('./itemDetails.html'),
            controller: 'itemDetailsController'
        });
    $routeProvider.when('/itemDetails/:itemID', {
        controller: 'itemDetailsController'
    });
}
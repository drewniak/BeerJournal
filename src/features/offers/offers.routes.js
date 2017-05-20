routes.$inject = ['$stateProvider'];

export default function routes($stateProvider) {
    $stateProvider
        .state('offers', {
            url: '/offers',
            template: require('./offers.html'),
            controller: 'OffersController',
 
        });
}

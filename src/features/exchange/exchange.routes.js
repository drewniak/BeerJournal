routes.$inject = ['$stateProvider'];

export default function routes($stateProvider) {
    $stateProvider
        .state('exchange', {
            url: '/exchange',
            template: require('./exchange.html'),
            controller: 'ExchangeController',
 
        });
}

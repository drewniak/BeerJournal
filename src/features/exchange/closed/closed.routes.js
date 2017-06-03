routes.$inject = ['$stateProvider'];

export default function routes($stateProvider) {
    $stateProvider
        .state('closed', {
            url: '/closed',
            template: require('./closed.html'),
            controller: 'ClosedController',
 
        });
}

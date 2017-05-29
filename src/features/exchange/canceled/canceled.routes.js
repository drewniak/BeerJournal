routes.$inject = ['$stateProvider'];

export default function routes($stateProvider) {
    $stateProvider
        .state('canceled', {
            url: '/canceled',
            template: require('./canceled.html'),
            controller: 'CanceledController',
 
        });
}

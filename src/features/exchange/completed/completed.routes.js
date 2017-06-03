routes.$inject = ['$stateProvider'];

export default function routes($stateProvider) {
    $stateProvider
        .state('completed', {
            url: '/completed',
            template: require('./completed.html'),
            controller: 'CompletedController',
 
        });
}

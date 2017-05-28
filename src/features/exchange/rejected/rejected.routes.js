routes.$inject = ['$stateProvider'];

export default function routes($stateProvider) {
    $stateProvider
        .state('rejected', {
            url: '/rejected',
            template: require('./rejected.html'),
            controller: 'RejectedController',
 
        });
}

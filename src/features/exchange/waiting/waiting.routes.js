routes.$inject = ['$stateProvider'];

export default function routes($stateProvider) {
    $stateProvider
        .state('waiting', {
            url: '/waiting',
            template: require('./waiting.html'),
            controller: 'WaitingController',
 
        });
}

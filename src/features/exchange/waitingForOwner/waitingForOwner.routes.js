routes.$inject = ['$stateProvider'];

export default function routes($stateProvider) {
    $stateProvider
        .state('waitingForOwner', {
            url: '/waitingForOwner',
            template: require('./waitingForOwner.html'),
            controller: 'WaitingForOwnerController',
 
        });
}

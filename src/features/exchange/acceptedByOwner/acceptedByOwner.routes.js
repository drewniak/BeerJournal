routes.$inject = ['$stateProvider'];

export default function routes($stateProvider) {
    $stateProvider
        .state('acceptedByOwner', {
            url: '/acceptedByOwner',
            template: require('./acceptedByOwner.html'),
            controller: 'AcceptedByOwnerController',
 
        });
}

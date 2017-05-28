routes.$inject = ['$stateProvider'];

export default function routes($stateProvider) {
    $stateProvider
        .state('acceptedByOfferor', {
            url: '/acceptedByOfferor',
            template: require('./acceptedByOfferor.html'),
            controller: 'AcceptedByOfferorController',
 
        });
}

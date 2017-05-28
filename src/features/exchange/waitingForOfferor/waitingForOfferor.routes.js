routes.$inject = ['$stateProvider'];

export default function routes($stateProvider) {
    $stateProvider
        .state('waitingForOfferor', {
            url: '/waitingForOfferor',
            template: require('./waitingForOfferor.html'),
            controller: 'WaitingForOfferorController',
 
        });
}

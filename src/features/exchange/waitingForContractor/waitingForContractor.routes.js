routes.$inject = ['$stateProvider'];

export default function routes($stateProvider) {
    $stateProvider
        .state('waitingForContractor', {
            url: '/waitingForContractor',
            template: require('./waitingForContractor.html'),
            controller: 'WaitingForContractorController',
 
        });
}

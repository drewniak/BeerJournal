routes.$inject = ['$stateProvider'];

export default function routes($stateProvider) {
    $stateProvider
        .state('acceptedByContractor', {
            url: '/acceptedByContractor',
            template: require('./acceptedByContractor.html'),
            controller: 'AcceptedByContractorController',
 
        });
}

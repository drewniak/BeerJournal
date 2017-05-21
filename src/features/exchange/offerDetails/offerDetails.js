routes.$inject = ['$stateProvider'];

export default function routes($stateProvider) {
    $stateProvider
        .state('offerDetails', {
            url: '/offerDetails',
            template: require('./offerDetails.html'),
            controller: 'OfferDetailsController',
            controllerAs: 'vm'
        });
}
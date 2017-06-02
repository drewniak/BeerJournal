routes.$inject = ['$stateProvider'];

export default function routes($stateProvider) {
    $stateProvider
        .state('acceptedByMe', {
            url: '/acceptedByMe',
            template: require('./acceptedByMe.html'),
            controller: 'AcceptedByMeController',
 
        });
}

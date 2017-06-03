routes.$inject = ['$stateProvider'];

export default function routes($stateProvider) {
    $stateProvider
        .state('waitingForMe', {
            url: '/waitingForMe',
            template: require('./waitingForMe.html'),
            controller: 'WaitingForMeController',
 
        });
}

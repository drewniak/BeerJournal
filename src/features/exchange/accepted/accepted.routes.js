routes.$inject = ['$stateProvider'];

export default function routes($stateProvider) {
    $stateProvider
        .state('accepted', {
            url: '/accepted',
            template: require('./accepted.html'),
            controller: 'AcceptedController',
 
        });
}

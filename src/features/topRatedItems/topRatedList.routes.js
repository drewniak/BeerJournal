routes.$inject = ['$stateProvider'];

export default function routes($stateProvider) {
    $stateProvider
        .state('topRatedList', {
            url: '/topRated',
            template: require('./topRatedList.html'),
            controller: 'TopRatedListController',
            controllerAs: 'vm'
        });
}
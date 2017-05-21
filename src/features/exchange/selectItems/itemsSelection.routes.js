routes.$inject = ['$stateProvider'];

export default function routes($stateProvider) {
    $stateProvider
        .state('selectItems', {
            url: '/selectItems',
            template: require('./itemsSelectionView.html'),
            controller: 'ItemsSelectionController',
            controllerAs: 'vm'
        });
}
routes.$inject = ['$stateProvider'];

export default function routes($stateProvider) {
    $stateProvider
        .state('editItem', {
            url: '/edit-item/:id',
            template: require('../../public/commonViews/itemForm.html'),
            controller: 'EditItemController',
            controllerAs: 'vm'
        });
}
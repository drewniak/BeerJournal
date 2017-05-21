/**
 * Created by wojciech_dymek on 22.04.17.
 */

routes.$inject = ['$stateProvider'];

export default function routes($stateProvider) {
    $stateProvider
        .state('addNewItem', {
            url: '/add-item',
            controller: 'AddNewItemController',
            controllerAs: 'vm'
        });
}
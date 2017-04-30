routes.$inject = ['$stateProvider'];

export default function routes($stateProvider) {
    $stateProvider
        .state('itemDetails', {
            controller: 'itemDetailsController'
        });
}
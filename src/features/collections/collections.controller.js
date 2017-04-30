export default function CollectionsController($rootScope, $scope, $http, $location, $uibModal) {
    let user = undefined;
    if (!$scope.selectedUser) {
        $scope.selectedUser = $rootScope.globals.currentUser;
        $scope.currentNavItem = "collections";
    }
    user = $scope.selectedUser;

    $scope.username = user.username;
    $scope.userItems = [];

    function userItems () {
        $http.get('/api/users/' + user.id + "/collection/items")
            .then(function (response) {
                $scope.userItems = response.data;
            }, function (error) {
                console.log(error);
            });
    }

    $scope.showDetails = function (itemId) {
        $scope.itemId = itemId;
        var modalInstance = $uibModal.open({
            templateUrl: 'modals/itemDetails.html',
            scope: $scope
        }).result.finally(
            function() {
            }
        ).then(angular.noop, angular.noop);
    }

    userItems();
}
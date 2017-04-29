export default function CollectionsController($rootScope, $scope, $http, $location) {
    let user = $rootScope.globals.currentUser;

    $scope.username = user.username;
    $scope.currentNavItem = "collections";

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
        $location.path("/itemDetails/" + itemId);
    }

    userItems();
}
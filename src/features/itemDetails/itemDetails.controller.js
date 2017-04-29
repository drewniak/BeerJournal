export default function itemDetailsController($rootScope, $scope, $http, $routeParams) {
    var itemID = $routeParams.itemID;
    let user = $rootScope.globals.currentUser;
    $scope.item = {};
    $scope.item.isOwner = true;
    $scope.item.owner = '';

    $http.get('/api/items/' + itemID).then(function(res) {
        $scope.item = res.data;
        //TODO
        var country = 'DE';
        $scope.item.countryImage = 'http://www.geognos.com/api/en/countries/flag/' + country + '.png';

        $scope.item.isOwner = $scope.item.ownerId == user.id;
        if (!$scope.item.isOwner) {
            $http.get('/api/users/' + $scope.item.ownerId).then(function(res) {
                $scope.item.owner = res.data.firstName + ' ' + res.data.lastName;
            });
        }
    });
}
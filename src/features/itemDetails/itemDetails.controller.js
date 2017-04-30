export default function itemDetailsController($rootScope, $scope, $http) {
    var itemID = $scope.itemId;
    let user = $rootScope.globals.currentUser;
    $scope.item = {};

    $http.get('/api/items/' + itemID).then(function(res) {
        $scope.item = res.data;
        //TODO
        var country = 'DE';
        $scope.item.countryImage = 'http://www.geognos.com/api/en/countries/flag/' + country + '.png';
    });
    
    $scope.close = function () {
        $scope.$dismiss('cancel');
    }
}
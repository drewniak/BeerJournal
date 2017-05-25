export default function TopRatedListController($rootScope, $scope, $http, $location, $uibModal) {
    let vm = this;
    vm.period = "past24h";

    $scope.availableSearchParams = [
        { key: "name", name: "Name", placeholder: "Name..." },
        { key: "city", name: "City", placeholder: "City...", restrictToSuggestedValues: true, suggestedValues: ['Berlin', 'London', 'Paris'] },
        { key: "email", name: "E-Mail", placeholder: "E-Mail...", allowMultiple: true },
    ];

    vm.getItems = function() {
        $http.get('/api/users/' + $rootScope.globals.currentUser.id + "/collection/items")
            .then(function (response) {
                vm.items = response.data.content;

                vm.items.forEach(function(item) {
                    item.rate = "5.0 " + vm.period;
                    setItemImage(item);
                });
            }, function (error) {
                console.log(error);
            });
    }

    vm.showDetails = function (itemId) {
        $scope.itemId = itemId;
        var modalInstance = $uibModal.open({
            templateUrl: 'modals/itemDetails.html',
            scope: $scope
        }).result.finally(
            function() {
            }
        ).then(angular.noop, angular.noop);
    }

    function setItemImage(item) {
        $http.get('/api/items/' + item.itemId).then(function(res) {
            var ids = res.data.imageIds;
            if (ids.length > 0) {
                item.image = '/api/files/' + ids[0];
            } else {
                item.image = undefined;
            }
        })
    }

    vm.getItems();
}
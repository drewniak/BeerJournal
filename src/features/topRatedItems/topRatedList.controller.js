export default function TopRatedListController($rootScope, $scope, $http, $location, $uibModal) {
    let vm = this;
    vm.period = "past24h";

    $scope.filter={};

    $scope.availableSearchParams = [
        { key: "country", name: "Country", placeholder: "Country...", allowMultiple: true },
        { key: "brewery", name: "Brewery", placeholder: "Brewery..." },
        { key: "type", name: "Type", placeholder: "Type...", restrictToSuggestedValues: true, suggestedValues: ['Bottle', 'Can', 'Cap', 'Label'] }
    ];

    vm.getItems = function() {
        $http.get('/api/users/' + $rootScope.globals.currentUser.id + "/collection/items", {
            params: {
                name: $scope.filter.query,
                category: $scope.filter.type,
                brewery: $scope.filter.brewery,
                country: $scope.filter.country,
                lacking: false
            }
        })
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

    $scope.$on('advanced-searchbox:modelUpdated', function (event, model) {
        $scope.filter.query = model.query;
        $scope.filter.type = model.type;
        $scope.filter.brewery = model.brewery;
        $scope.filter.country = model.country;

        if($scope.filter.type) {
            $scope.filter.type = $scope.filter.type.toLowerCase();
        }
        vm.getItems();
    });

    vm.getItems();
}
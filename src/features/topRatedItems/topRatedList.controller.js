export default function TopRatedListController($rootScope, $scope, $http, $location, $uibModal) {
    let vm = this;
    vm.period = "past24h";

    $scope.filter={};
    $scope.pagination = {
        currentPage: 1,
        itemsPerPage: 10,
        totalItems: null,
        pageChanged: function () {
            vm.getItems();
        }
    };

    $scope.availableSearchParams = [
        { key: "country", name: "Country", placeholder: "Country...", allowMultiple: true },
        { key: "brewery", name: "Brewery", placeholder: "Brewery..." },
        { key: "type", name: "Type", placeholder: "Type...", restrictToSuggestedValues: true, suggestedValues: ['Bottle', 'Can', 'Cap', 'Label'] }
    ];

    var periods = {
        past24h: "now-1d",
        pastWeek: "now-1w",
        pastMonth: "now-1M",
        pastYear: "now-1y"
    };

    vm.getItems = function() {
        var sort = {
            averageRating : {
                order : "desc"
            }
        };
        var query = {
            bool: {
                must: []
            }
        };

        if ($scope.filter.type) {
            var match = {
                type: $scope.filter.type
            }
            query.bool.must.push({match: match});
        }
        if ($scope.filter.brewery) {
            var match = {
                brewery: $scope.filter.brewery
            }
            query.bool.must.push({match: match});
        }
        if ($scope.filter.country) {
            var match = {
                country: $scope.filter.country
            }
            query.bool.must.push({match: match});
        }
        if ($scope.filter.query) {
            var match = {
                _all: $scope.filter.query
            }
            query.bool.must.push({match: match});
        }
        if (vm.period != "allTime") {
            var range = {
                created: {
                    gte: periods[vm.period]
                }
            }
            query.bool.must.push({range: range});
        }

        $http.post('/search', {query: query, sort: sort}, {
            params: {
                size: $scope.pagination.itemsPerPage,
                from: ($scope.pagination.currentPage-1) * $scope.pagination.itemsPerPage,
                pretty: true
            }
        }).then(function(res){
            $scope.pagination.totalItems = res.data.hits.total;

            vm.items = [];
            res.data.hits.hits.forEach(function (hit) {
                var item = hit._source;
                item.itemId = hit._id;
                setItemImage(item);
                vm.items.push(item);
            })
        }, function(res){
            console.log(res);
        })
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
        $scope.pagination.currentPage = 1;

        if($scope.filter.type) {
            $scope.filter.type = $scope.filter.type.toLowerCase();
        }
        vm.getItems();
    });

    vm.getItems();
}
export default function ItemsSelectionController($rootScope, $scope, $http, $location, toastr) {

    $scope.pagination = {
        totalItems: null,
    };

    let user = $rootScope.globals.currentUser;

    $scope.username = user.username;
    $scope.userItems = [];
    $scope.desiredItem = {};

    function userItems () {
        $http.get('/api/users/' + user.id + "/collection/items")
            .then(function (response) {
                $scope.pagination.totalItems = response.data.totalElements;

                $http.get('/api/users/' + user.id + "/collection/items", {
                    params: {
                        lacking: false,
                        count: $scope.pagination.totalItems
                    }})
                    .then(function (response) {
                        $scope.userItems = response.data.content;

                        $scope.userItems.forEach(function(item) {
                            getItemImage(item.itemId).then(function(src) {
                                item.image = src;
                            });

                            $http.get('/api/items/' + item.itemId).then(function(res) {
                                item.brewery = res.data.brewery;
                                item.style = res.data.style;
                                item.country = res.data.country;
                                item.type = res.data.type;
                            })
                        })
                    }, function (error) {
                        console.log(error);
                    });

            }, function (error) {
                console.log(error);
            });
    }

    function getDesiredItemDetails(itemId) {
        $http.get('/api/items/' + itemId).then(function(res) {
            $scope.desiredItem = res.data;

            $http.get('/api/users/' + res.data.ownerId).then(function(res) {
                $scope.desiredItem.owner = res.data.firstName + ' ' + res.data.lastName;
            })

            if (res.data.imageIds.length > 0) {
                $scope.desiredItem.image = '/api/files/' + res.data.imageIds[0];
            }
        })
    }

    function getItemImage(itemId) {
        return $http.get('/api/items/{itemId}/images?itemId=' + itemId).then(function(res) {
            if (res.data.length == 0) {
                return ''
            }

            return '/api/files/' + res.data[0];
        });
    }

    $scope.submit = function() {
        var body = {};

        body.desiredItemIds = [$location.search().id];
        body.offeredItemIds = [];
        $scope.userItems.forEach(function(item) {
            if (item.selected) {
                body.offeredItemIds.push(item.itemId);
            }
        })
        body.offerorId = user.id;
        body.ownerId = $scope.desiredItem.ownerId;

        console.log(body);
        $http.post('/api/exchanges', body).then(function() {
                toastr.success('Offer processed', '');
                $location.path('/collections');
            },
            function(res) {
                console.log(res);
                toastr.error('Ops sth went wrong :(', '');
            });
    }

    getDesiredItemDetails($location.search().id);
    userItems();
}
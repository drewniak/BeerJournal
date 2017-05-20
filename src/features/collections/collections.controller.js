export default function CollectionsController($rootScope, $scope, $http, $location, $uibModal) {

    $scope.pagination = {
        currentPage: 1,
        itemsPerPage: 10,
        totalItems: null,
        pageChanged: function () {
            userItems();
        }
    };

    let user = undefined;
    $scope.isUserCollection = false;

    var selectedUserId = $location.search().id;
    if (!selectedUserId) {
        selectedUserId = $rootScope.globals.currentUser.id;
        $scope.currentNavItem = "collections";
    }
    $scope.isUserCollection = selectedUserId === $rootScope.globals.currentUser.id;
    $scope.userItems = [];

    $http.get('/api/users/' + selectedUserId).then(function(res) {
        user = res.data;
        $scope.username = user.username;
        userItems();
    })

    function userItems () {
        $http.get('/api/users/' + user.id + "/collection/items", {
            params: {
                lacking: false,
                count: $scope.pagination.itemsPerPage,
                page: $scope.pagination.currentPage-1
            }})
            .then(function (response) {
                console.log(response.data)
                $scope.userItems = response.data.content;
                $scope.pagination.totalItems = response.data.totalElements;
                $scope.pagination.numPages = response.data.totalPages;

                $scope.userItems.forEach(function(item) {
                    setItemImage(item);
                });
            }, function (error) {
                console.log(error);
            });
        $http.get('/api/users/' + user.id)
            .then(function (response) {
                $scope.user_firstName = response.data.firstName;
                $scope.user_lastName = response.data.lastName;
            }, function (error) {
                console.log(error);
            });
        $http.get('api/users/'+user.id+'/avatar')
            .then(function (response) {
                $scope.avatar = 'api/users/'+user.id+'/avatar';
            }, function (error) {
                $scope.avatar = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzxeed1zuKopBf5p58ffZNLCz2DMwbmA_xj9fD2W-EzZ4xcsVN6oFhAAw';
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

    $scope.deleteItem = function (itemID) {
        dialogConfirm("Are you sure?", "Delete item").then(function(res) {
        },
        function(res) {
            if (!res) { //delete item when res is undefined
                $http.delete('/api/users/' + user.id + '/collection/items/' + itemID).then(function () {
                    userItems();
                }, function (res) {
                    console.log(res);
                    console.log('Unable to remove item: ' + itemID + ' from collection')
                })
            }
        })
    }


    function dialogConfirm(message, title) {
        var modal = $uibModal.open({
            size: 'sm',
            templateUrl: '/modals/dialogConfirm.html',
            controller: function ($scope, $uibModalInstance) {

                $scope.modal = $uibModalInstance;

                if (angular.isObject(message)) {
                    angular.extend($scope, message);
                } else {
                    $scope.message = message;
                    $scope.title = angular.isUndefined(title) ? '' : title;
                }
            }
        });

        return modal.result;
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
}
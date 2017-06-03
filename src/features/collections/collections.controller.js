export default function CollectionsController($rootScope, $sessionStorage, $scope, $http, $location, $uibModal) {
    
    $scope.pagination = {
        currentPage: 1,
        itemsPerPage: 10,
        totalItems: null,
        pageChanged: function () {
            userItems();
        }
    };

    $scope.filter = {
        name: "",
        category: "",
        changed: function () {
            $scope.pagination.currentPage = 1;
            userItems();
        }
    };

    let user = undefined;
    $scope.isUserCollection = false;

    var selectedUserId = undefined;
    if ($scope.selectedUser) {
        selectedUserId = $scope.selectedUser.id
    }
    if (!selectedUserId) {
        if ($location.search().id) {
            selectedUserId = $location.search().id;
        } else {
            selectedUserId = $rootScope.globals.currentUser.id;
        }
        $scope.currentNavItem = "collections";
    }
    $scope.isUserCollection = selectedUserId === $rootScope.globals.currentUser.id;
    $scope.userItems = [];
    $scope.getUserItems = userItems;
    $scope.sortBy = "averagerating";
    $scope.sortType = "desc";


    $scope.sortOptions = [
        {val:"name", label:"Name"},
        {val:"type", label:"Type"},
        {val:"country", label:"Country"},
        {val:"brewery", label:"Brewery"},
        {val:"style", label:"Style"},
        {val:"averagerating", label:"Avg rating"},
        {val:"createtime", label:"Create time"}
    ];

    $http.get('/api/users/' + selectedUserId).then(function(res) {
        user = res.data;
        $scope.firstName = user.firstName;
        $scope.lastName = user.lastName;
        $scope.username = user.username;
        userItems();
        getUserAvatar();
    })

    function userItems (sortBy="averagerating", sortType="desc") {
        $http.get('/api/users/' + user.id + "/collection/items", {
            params: {
                name: $scope.filter.name,
                category: $scope.filter.category,
                lacking: false,
                count: $scope.pagination.itemsPerPage,
                page: $scope.pagination.currentPage-1,
                sortBy: sortBy,
                sortType: sortType
            }})
            .then(function (response) {
                $scope.userItems = response.data.content;
                $scope.pagination.totalItems = response.data.totalElements;
                $scope.pagination.numPages = response.data.totalPages;

                $scope.userItems.forEach(function(item) {
                    setItemImage(item);
                });
            }, function (error) {
                console.log(error);
            });
    }

    function getUserAvatar() {
        var DEFAULT = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzxeed1zuKopBf5p58ffZNLCz2DMwbmA_xj9fD2W-EzZ4xcsVN6oFhAAw';

        $http.get('/api/users/' + user.id).then(
            function (res) {
                if (res.data.avatarFileId) {
                    $scope.selectedUserAvatar = '/api/files/' + res.data.avatarFileId;
                } else {
                    if($sessionStorage.getObject('user').fbId){
                        $scope.selectedUserAvatar = 'http://graph.facebook.com/' + $sessionStorage.getObject('user').fbId + '/picture?type=normal';
                    }else {
                        $scope.selectedUserAvatar = DEFAULT;
                    }
                }
            },
            function () {
                $scope.selectedUserAvatar = DEFAULT;
            })

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
    $scope.addItem = function () {
      
        var modalInstance = $uibModal.open({
            templateUrl: 'modals/itemModal.html',
            controller: 'AddNewItemController',
            controllerAs: 'vm',
            scope: $scope,
            size: 'lg'
        }).result.then(function(res) {
            },
            function(res) {
                if(!res) {  //refresh when its undefined
                    async function refresh() {
                        await sleep(500)
                        userItems()
                    };
                    refresh();
                }
            }
        );
    }

    $scope.editItem = function (id) {
        $rootScope.itemId = id
        var modalInstance = $uibModal.open({
            templateUrl: 'modals/itemModal.html',
            controller: 'EditItemController',
            controllerAs: 'vm',
            scope: $scope,
            size: 'lg'
        }).result.then(function(res) {
            },
            function(res) {
                delete $rootScope['itemId'];
                if(!res) {  //refresh when its undefined
                    async function refresh() {
                        await sleep(500)
                        userItems()
                    };
                    refresh();
                }
            }
        );
    };


    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
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
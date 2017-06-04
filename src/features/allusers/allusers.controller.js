export default function AllUsersController($rootScope, $scope, $location, $http, $uibModal, Lightbox) {

    $scope.pagination = {
        currentPage: 1,
        itemsPerPage: 10,
        totalItems: null,
        pageChanged: function () {
            getUsersFromServer();
        }
    };

    $scope.filter = {
        firstname: "",
        lastname: "",
        changed: function () {
            $scope.pagination.currentPage = 1;
            getUsersFromServer();
        }
    };

    let user = $rootScope.globals.currentUser;

    $scope.username = user.username;
    $scope.currentNavItem = "users";
    $scope.users = [];
    $scope.sortBy = "jointime";
    $scope.sortType = "desc";
    $scope.getUsersFromServer = getUsersFromServer;

    $scope.showItems = false;

    $scope.sortOptions=[
        {val:"jointime", label:"Join time"},
        {val:"firstname", label:"First name"},
        {val:"lastname", label:"Last name"}
    ]

    function getUsersFromServer (sortBy="jointime", sortType="desc") {
        $http.get('/api/users/', {
            params: {
                firstname: $scope.filter.firstname,
                lastname: $scope.filter.lastname,
                count: $scope.pagination.itemsPerPage,
                page: $scope.pagination.currentPage-1,
                sortBy: sortBy,
                sortType: sortType
            }})
            .then(function (response) {
                $scope.users = response.data.content;
                $scope.pagination.totalItems = response.data.totalElements;
                $scope.pagination.numPages = response.data.totalPages;

                var usersId = [];
                $scope.users.forEach(function (user) {
                    user.images = [];
                    getUserCollection(user);
                    usersId.push(user.id);
                })
            }, function (error) {
                console.log(error);
            });
    }

    var selectedUserId = $location.search().id;
    if (selectedUserId) {
        $http.get('/api/users/' + selectedUserId).then(function(user) {
            showUserItems(user.data);
        });
    }

    getUsersFromServer();

    $scope.openLightboxModal = function (index,images) {
        Lightbox.openModal(images, index);
    };

    $scope.showUserItems = showUserItems;

    $scope.back = function () {
        $scope.showItems = false;
    }

    function showUserItems(user) {
        $scope.selectedUser = user;
        $scope.selectedUser.username = user.firstName + ' ' + user.lastName;
        $scope.showItems = true;
    }

    function getUserCollection(user) {
        $http.get('api/users/'+user.id+'/collection/items', {
            params:{
                count: 3,
                sortBy: "averagerating",
                sortType: "desc"
            }
        }).then(function (response) {
            response.data.content.forEach(function (item) {
                $http.get('/api/items/'+item.itemId)
                    .then(function (res) {
                        if (res.data.mainImageId) {
                            user.images.push('/api/files/' + res.data.mainImageId);
                        }
                    }, function (error) {
                        console.log(error);
                    });
            })
        }, function (error) {
            console.log(error);
        });
    }
}
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

    $scope.showItems = false;

    function getUsersFromServer () {
        $http.get('/api/users/', {
            params: {
                firstname: $scope.filter.firstname,
                lastname: $scope.filter.lastname,
                count: $scope.pagination.itemsPerPage,
                page: $scope.pagination.currentPage-1
            }})
            .then(function (response) {
                $scope.users = response.data.content;
                $scope.pagination.totalItems = response.data.totalElements;
                $scope.pagination.numPages = response.data.totalPages;

                var usersId = [];
                $scope.users.forEach(function (user) {
                    user.images = [];
                    usersId.push(user.id);
                })
                getUserCollections(usersId);
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

    function getUserCollections(usersId) {
        usersId.forEach(function (id) {
            $http.get('api/users/'+id+'/collection/items')
                .then(function (response) {
                    var userItem = {};
                    userItem.id = id;
                    userItem.images = [];
                    response.data.content.forEach(function (item) {
                      $http.get('/api/items/'+item.itemId)
                            .then(function (res) {
                                res.data.imageIds.forEach(function (imageId) {
                                    userItem.images = ['/api/files/' + imageId];
                                    createImagesCollection(userItem);
                                })
                            }, function (error) {
                                console.log(error);
                            });
                    })
                }, function (error) {
                    console.log(error);
                });

        })
    }

    var createImagesCollection = function (userItem) {
        var imageTabObj = $scope.users.filter(function(v) {
            return v.id === userItem.id;
        })[0];
        if(imageTabObj.images!=null) {
            imageTabObj.images = imageTabObj.images.concat(userItem.images)
            removeByAttr($scope.users, 'id', imageTabObj.id);
            $scope.users.push(imageTabObj);
        }else{
            imageTabObj.images = userItem.images;
            removeByAttr($scope.users,'id',imageTabObj.id);
            $scope.users.push(imageTabObj);
        }
    }



    var removeByAttr = function(arr, attr, value){
        var i = arr.length;
        while(i--){
            if( arr[i]
                && arr[i].hasOwnProperty(attr)
                && (arguments.length > 2 && arr[i][attr] === value ) ){
                arr.splice(i,1);
            }
        }
        return arr;
    }
}






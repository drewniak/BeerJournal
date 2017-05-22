export default function EventsController($rootScope, $sessionStorage,$scope, $http, $location, $uibModal, moment) {
    $scope.pagination = {
        currentPage: 1,
        itemsPerPage: 10,
        totalItems: null,
        pageChanged: function () {
            events();
        }
    };

    let user = undefined;
    if (!$scope.selectedUser) {
        $scope.selectedUser = $rootScope.globals.currentUser;
        $scope.currentNavItem = "events";
    }
    user = $scope.selectedUser;

    $scope.username = user.username;


    function events() {
        $http.get("/api/events", {
            params: {
                count: $scope.pagination.itemsPerPage,
                page: $scope.pagination.currentPage-1
            }})
            .then(function (response) {
                var events = response.data.content;
                $scope.pagination.totalItems = response.data.totalElements;
                $scope.pagination.numPages = response.data.totalPages;
                $scope.events = [];
                events.forEach(function (event) {
                    event.date = moment(event.date).fromNow();
                    loadEventImage(event);
                    $scope.events.push(event);
                })
            }, function (error) {
                console.log(error);
            });
    }

    $scope.userCreatedEvent = function(user) {
        $location.path('/allUsers').search('id', user.id);
    }

    $scope.itemEvent = function (item) {
        $scope.itemId = item.id;
        var modalInstance = $uibModal.open({
            templateUrl: 'modals/itemDetails.html',
            scope: $scope
        }).result.finally(
            function () {
            }
        ).then(angular.noop, angular.noop);
    }

    function loadEventImage(event) {
        if (event.dataType == 'ITEM') {
            var DEFAULT = 'https://image.flaticon.com/icons/svg/410/410321.svg';

            $http.get('/api/items/' + event.data.id).then(
                function (res) {
                    var imageIds = res.data.imageIds;
                    if (imageIds.length > 0) {
                        event.image = '/api/files/' + imageIds[0];
                    } else {
                        event.image = DEFAULT;
                    }
                }, function () {
                    event.image = DEFAULT;
                });
        } else if (event.dataType == 'USER') {
            var DEFAULT = 'https://maxcdn.icons8.com/Color/PNG/48/Users/checked_user_male-48.png';
            if($sessionStorage.getObject('user').fbId){
                $scope.image = 'http://graph.facebook.com/' + $sessionStorage.getObject('user').fbId + '/picture?type=normal';
            }else {
                $http.get('/api/users/' + event.data.id).then(
                    function (res) {
                        if (res.data.avatarFileId) {
                            event.image = '/api/users/' + event.id + '/avatar';
                        } else {
                            event.image = DEFAULT;
                        }
                    },
                    function () {
                        event.image = DEFAULT;
                    })
            }
        }
    }

    events();
}
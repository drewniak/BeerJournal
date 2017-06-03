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
            var DEFAULT = 'images/fallbackIcons/item.svg';

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
            var DEFAULT = 'images/fallbackIcons/user.png';

            $http.get('/api/users/' + event.data.id).then(
                function (res) {
                    if (res.data.avatarFileId) {
                        event.image = '/api/files/' + res.data.avatarFileId;
                    } else {
                        if($sessionStorage.getObject('user').fbId){
                            $scope.image = 'http://graph.facebook.com/' + $sessionStorage.getObject('user').fbId + '/picture?type=normal';
                        }else {
                            event.image = DEFAULT;
                        }
                    }
                },
                function () {
                    event.image = DEFAULT;
                })

        }
    }

    events();
}
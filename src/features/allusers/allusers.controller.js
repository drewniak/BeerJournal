export default function AllUsersController($rootScope, $scope, $http,$uibModal,Lightbox) {
 
    let user = $rootScope.globals.currentUser;

    $scope.username = user.username;
    $scope.currentNavItem = "users";
    $scope.users = [];

    $scope.showItems = false;

    $scope.images = [
        {
            'url': 'https://farm6.staticflickr.com/5830/20552523531_e1efec8d49_k.jpg',
            'shouldShow' : 'true'
        },
        {
            'url': 'https://farm8.staticflickr.com/7300/12807911134_ff56d1fb3b_b.jpg',
            'shouldShow' : 'true'
        },
        {
            'url': 'https://farm1.staticflickr.com/400/20228789791_52fb84917f_b.jpg',
            'shouldShow' : 'true'
        },
        {
            'url': 'https://farm1.staticflickr.com/260/20185156095_912c2714ef_b.jpg'
        },
        {
            'url': 'https://farm6.staticflickr.com/5757/20359334789_57316968ed_m.jpg',
            'shouldShow' : 'true'
        },
        {
            'url': 'https://farm1.staticflickr.com/359/18741723375_28c89372d7_c.jpg'
        },
    ];


    function getUsersFromServer () {
        $http.get('/api/users/')
            .then(function (response) {
                $scope.users = response.data;
            }, function (error) {
                console.log(error);
            });
    }

   getUsersFromServer();

    $scope.openLightboxModal = function (index) {
        Lightbox.openModal($scope.images, index);
    };

    $scope.showUserItems = function (user) {
        $scope.selectedUser = user;
        $scope.selectedUser.username = user.firstName + ' ' + user.lastName;
        $scope.showItems = true;
    }

    $scope.back = function () {
        $scope.showItems = false;
    }
}



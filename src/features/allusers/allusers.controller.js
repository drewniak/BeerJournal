export default function AllUsersController($rootScope, $scope, $http,Lightbox) {
 
    let user = $rootScope.globals.currentUser;

    $scope.username = user.username;
    $scope.currentNavItem = "users";
    $scope.users = [];

    $scope.images = [
        {
            'url': 'https://farm6.staticflickr.com/5830/20552523531_e1efec8d49_k.jpg',
            'caption': 'This image has dimensions 2048x1519 and the img element is scaled to fit inside the window.'
        },
        {
            'url': 'https://farm8.staticflickr.com/7300/12807911134_ff56d1fb3b_b.jpg'
        },
        {
            'url': 'https://farm1.staticflickr.com/400/20228789791_52fb84917f_b.jpg',
            'caption': 'The left and right arrow keys are binded for navigation. The escape key for closing the modal is binded by AngularUI Bootstrap.'
        },
        {
            'url': 'https://farm1.staticflickr.com/260/20185156095_912c2714ef_b.jpg'
        },
        {
            'url': 'https://farm6.staticflickr.com/5757/20359334789_57316968ed_m.jpg',
            'caption': 'Default minimum modal dimensions (400x200) apply for this image (240x95).'
        },
        {
            'url': 'https://farm1.staticflickr.com/359/18741723375_28c89372d7_c.jpg'
        },
        {
            'url': 'https://farm6.staticflickr.com/5606/15425945368_6f6ae945fc.jpg'
        },
        {
            'url': 'https://farm6.staticflickr.com/5606/15425945368_6f6ae945fc.jpg'
        },
        {
            'url': 'https://farm6.staticflickr.com/5606/15425945368_6f6ae945fc.jpg'
        },
        {
            'url': 'https://farm6.staticflickr.com/5606/15425945368_6f6ae945fc.jpg',
            'category' : 'bootle'
        },
        {
            'url': 'https://farm6.staticflickr.com/5606/15425945368_6f6ae945fc.jpg',
        },
        {
            'url': 'https://farm6.staticflickr.com/5606/15425945368_6f6ae945fc.jpg',
        },
        {
            'url': 'https://farm6.staticflickr.com/5606/15425945368_6f6ae945fc.jpg',
        },
        {
            'url': 'https://farm6.staticflickr.com/5606/15425945368_6f6ae945fc.jpg',
        },
        {
            'url': 'https://farm6.staticflickr.com/5606/15425945368_6f6ae945fc.jpg',
        },
        {
            'url': 'https://farm6.staticflickr.com/5606/15425945368_6f6ae945fc.jpg',
        },
        {
            'url': 'https://farm6.staticflickr.com/5606/15425945368_6f6ae945fc.jpg',
        },
        {
            'url': 'https://farm6.staticflickr.com/5606/15425945368_6f6ae945fc.jpg',
        },
        {
            'url': 'https://farm6.staticflickr.com/5606/15425945368_6f6ae945fc.jpg',
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

}



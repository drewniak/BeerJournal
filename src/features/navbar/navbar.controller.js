export default function NavbarController($scope, $sessionStorage, $rootScope, $http, authService) {
    let vm = this;
    vm.logout = function () {
        authService.logout();
    };

    vm.isLoggedIn = function () {
        return authService.isLoggedIn();
    };

    vm.getCurrentUsername = function () {
        return authService.getCurrentUserName();
    }


    $scope.loginFb = function () {
        authService.loginFb()
    }

    $scope.turnOffCamera = function () {
        $rootScope.localstream.getTracks()[0].stop();
        $rootScope.localstream = undefined;
        $rootScope.cameraTurnedOn = false;
    }

    var getUserAvatar = function () {
        $scope.avatar = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzxeed1zuKopBf5p58ffZNLCz2DMwbmA_xj9fD2W-EzZ4xcsVN6oFhAAw';
        if (vm.isLoggedIn()) {
            if($sessionStorage.getObject('user').fbId){
             $scope.avatar = 'http://graph.facebook.com/' + $sessionStorage.getObject('user').fbId + '/picture?type=normal';
            }else {
                $http.get('api/users/' + $rootScope.globals.currentUser.id + '/avatar')
                    .then(function (response) {
                        $scope.avatar = 'api/users/' + $rootScope.globals.currentUser.id + '/avatar';
                    }, function (error) {
                    });
            }
        }
    }

    getUserAvatar();
}



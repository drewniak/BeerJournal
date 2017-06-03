export default function NavbarController($scope, $rootScope, $http, authService, $cookieStore, $timeout, $sessionStorage) {
    let vm = this;
    vm.defaultAvatar = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzxeed1zuKopBf5p58ffZNLCz2DMwbmA_xj9fD2W-EzZ4xcsVN6oFhAAw';
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
        $scope.avatar = undefined;
        if (vm.isLoggedIn()) {
            $http.get('/api/users/' + $rootScope.globals.currentUser.id)
                .then(function(res) {
                    if(res.data.avatarFileId) {
                        $scope.avatar = 'api/files/' + res.data.avatarFileId;
                    } else {
                        if($sessionStorage.getObject('user').fbId){
                            $scope.avatar = 'http://graph.facebook.com/' + $sessionStorage.getObject('user').fbId + '/picture?type=normal';
                        } else {
                            $scope.avatar = vm.defaultAvatar;
                        }
                    }
                }, function(err) {
                    console.log(err);
                    $scope.avatar = vm.defaultAvatar;
                });
        } else {
            $scope.avatar = vm.defaultAvatar;
        }
    }

    function initThemeCustomize() {
        let color = $cookieStore.get("themeColor");
        console.log(color);
        if (!color) {
            color = "#febf01";
        }

        $cookieStore.put("themeColor", $scope.themeColor)

        $scope.themeColor = color;
        $rootScope.themeColor = $scope.themeColor;

        $scope.$watch("themeColor", (themeColor) => {
            $cookieStore.put("themeColor", $scope.themeColor)
            console.log($cookieStore.get("themeColor"))
        });
    }

    getUserAvatar();
    initThemeCustomize();
}

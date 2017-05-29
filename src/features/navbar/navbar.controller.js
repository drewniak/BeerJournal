export default function NavbarController($scope, $rootScope, $http, authService, $cookieStore, $timeout, $sessionStorage) {
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
            $http.get('api/users/' + $rootScope.globals.currentUser.id + '/avatar')
                .then(function (response) {
                    $scope.avatar = 'api/users/' + $rootScope.globals.currentUser.id + '/avatar';
                }, function (error) {
                    if($sessionStorage.getObject('user').fbId){
                        $scope.avatar = 'http://graph.facebook.com/' + $sessionStorage.getObject('user').fbId + '/picture?type=normal';
                    }
                });

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

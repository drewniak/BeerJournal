export default function NavbarController(authService,$scope) {
    let vm = this;
    vm.logout = function () {
        authService.logout();
    };

    vm.isLoggedIn = function () {
        return authService.isLoggedIn();
    };

    vm.getCurrentUsername = function() {
        return authService.getCurrentUserName();
    }


    $scope.loginFb = function () {
        authService.loginFb()
    }
}



export default function HomeController($scope,authService) {

    $scope.loginFb = function () {
        authService.loginFb()
    }


}



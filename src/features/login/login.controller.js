/**
 * Created by wojciech_dymek on 21.04.17.
 */

export default function LoginController(authService,$uibModal,$scope) {
    let vm = this;
    vm.login = function(){
        authService.login(vm.username, vm.password);
    };

    vm.logout = function () {
        authService.logout();
    };

    vm.changePassword = function () {
        var modalInstance = $uibModal.open({
            templateUrl: 'modals/resetPassword.html',
            controller: 'LoginController',
            controllerAs: 'vm',
            size: 'lg'
        })
    }

    vm.closeModal = function () {
        location.reload();
    }

    $scope.reset = function () {
        console.log("reset");
        var user = {
            "email" : $scope.user.email,
            "password" : $scope.user.password
        }
    }

    $scope.checkPasswords = function() {
        $scope.form.passwordRepeated.$error.dontMatch = $scope.user.password !== $scope.password2 && !$scope.form.passwordRepeated.$error.required;
        $scope.form.password.$error.wrongPasswordPattern = checkPasswordPattern($scope.user.password ) && !$scope.form.password.$error.required;
    }

    function checkPasswordPattern(str)
    {
        // at least one number, one lowercase and one uppercase letter
        // at least six characters
        var re = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
        return !re.test(str);
    }


}
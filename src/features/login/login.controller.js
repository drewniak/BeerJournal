/**
 * Created by wojciech_dymek on 21.04.17.
 */

export default function LoginController(authService,$uibModal,$scope,toastr,$http) {
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
        var email = {
            "email" : $scope.user.email
        }
        $http.put('/api/account/password/reset', email).then(function (res) {
            toastr.success('New password was sent to your mail box');
            location.reload();
        },function (resp) {
            toastr.error('Reset password failed','Error');
        });

    }

}
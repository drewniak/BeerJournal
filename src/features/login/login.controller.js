/**
 * Created by wojciech_dymek on 21.04.17.
 */

export default function LoginController(authService) {
    let vm = this;
    vm.login = function(){
        authService.login(vm.username, vm.password);
    };

    vm.logout = function () {
        authService.logout();
    };


}
/**
 * Created by wojciech_dymek on 19.04.17.
 */
export default function RegistrationController($rootScope, $scope, $http, $location, toastr) {
    let registration = this;
    registration.register = register;

    function register() {
        $http.post('/api/users', registration.user)
            .then(function(res) {
                    toastr.info('User successfully created ', '');
                    $location.path('/login');
                },
                function(res) {
                    if(res.status === 409){
                         toastr.error('User with given email already exists ', 'Error');
                      }
                    toastr.error('Unable to create new user ', 'Error');
                    console.log(res);
                });
    }

    $scope.checkPasswords = function() {
        $scope.form.passwordRepeated.$error.dontMatch = registration.user.password !== registration.password2 && !$scope.form.passwordRepeated.$error.required;
        $scope.form.password.$error.wrongPasswordPattern = checkPasswordPattern(registration.user.password ) && !$scope.form.password.$error.required;
    }

    function checkPasswordPattern(str)
    {
        // at least one number, one lowercase and one uppercase letter
        // at least six characters
        var re = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
        return !re.test(str);
    }

    $scope.checkEmail = function() {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        $scope.form.email.$error.dontMatch = !re.test(registration.user.email) && !$scope.form.email.$error.required;
    }
}

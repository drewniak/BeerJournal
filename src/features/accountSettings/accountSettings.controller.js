export default function AccountSettingsController(authService,$sessionStorage, $scope, $rootScope, $stateParams, $http, $location,$base64,toastr) {
    let accountSettings = this;
    $scope.userData = {};
    $scope.errorMessage;
    $scope.isFbUser = false;

    $http.get('/api/users/' + $rootScope.globals.currentUser.id).then(function (response) {
        $scope.userData.firstName = response.data.firstName;
        $scope.userData.lastName = response.data.lastName;
        $scope.userData.email = "";
        $scope.userData.password = "";
        if($sessionStorage.getObject('user').pass) {
            $scope.isFbUser = true;
            $scope.userData.password =  $base64.decode($sessionStorage.getObject('user').pass);
            $scope.userData.email = $sessionStorage.getObject('user').username;
        }else{
            $scope.isFbUser = false;
            $scope.userData.email = response.data.password;
            $scope.userData.password = response.data.email;
        }
    });

    $scope.updateUser = function () {
        var userData = {
            "password": $scope.userData.password,
            "lastName": $scope.userData.lastName,
            "firstName": $scope.userData.firstName
        };
        $http.put('/api/account/', userData).then(function (res) {
            $location.path("/accountSettings")
            toastr.success('User data successfully updated');
        }, function (res) {
            $scope.errorMsg = "Unable to update user";
            toastr.error('Update user data failed','Error');
        });
    };

    $scope.updateAvatar = function () {
        console.log($scope.imageFile);
        if ($scope.imageFile != null) {
            $scope.form = [];
            $http({
                method  : 'POST',
                url     : '/api/users/' +$rootScope.globals.currentUser.id + '/avatar',
                processData: false,
                transformRequest: function (data) {
                    var formData = new FormData();
                    formData.append("file", $scope.imageFile);
                    return formData;
                },
                data : $scope.form,
                headers: {
                    'Content-Type': undefined
                }
            }).then(function(res){
                toastr.success('Avatar successfully updated')
                location.reload();
            }, function (error) {
                toastr.error('Update user data failed','Error');
            });
        }

    }

    $scope.deleteAvatar = function () {
        if (confirm("Are you sure?") == true) {
            $http.delete('/api/users/' + $rootScope.globals.currentUser.id + '/avatar').then(function (res) {
                toastr.success('Avatar successfully deleted')
                location.reload();
            }, function (error) {
                toastr.error('Delete avatar failed', 'Error');
            });
        }
    }

    $scope.updateUserEmail = function () {
        var userDataForEmail = {
            "password": $scope.userData.password,
            "email": $scope.userData.email,
            "newEmail": $scope.userData.newEmail
        };


        $http.put('/api/account/email', userDataForEmail).then(function (res) {
            toastr.success('Email successfully updated');
        }, function (res) {
            toastr.error('Update user data failed', 'Error');
        });
    };

    $scope.updateUserPass = function () {
        var userDataForPassword = {
            "password": $scope.userData.password,
            "newPassword": $scope.userData.newPassword,
        };

        $http.put('/api/account/password', userDataForPassword).then(function (res) {
            toastr.success('Password successfully updated');
        },function (resp) {
            toastr.error('Update user data failed','Error');
        });


    }

    $scope.deleteUser = function () {
        if (confirm("Are you sure?") == true) {
            $http({
                url: 'api/account',
                method: 'DELETE',
                data: {
                    "email" : $scope.userData.email,
                    "password" : $scope.userData.password
                },
                headers: {
                    "Content-Type": "application/json;charset=utf-8"
                }
            }).then(function(res) {
                authService.logout();
            }, function(error) {
                toastr.error('Delete user failed','Error');
            });
        }
    }

    $scope.previewFile = function () {
        var preview = document.getElementById('image');
        var file = document.querySelector('input[type=file]').files[0];
        var reader = new FileReader();
        document.getElementById("fname").value; //string file url
        reader.addEventListener("load", function () {
            preview.src = reader.result;
        }, false);

        if (file) {
            reader.readAsDataURL(file);
            $scope.imageFile = file;
        }
    }

    $scope.checkPasswords = function() {
        $scope.form.password.$error.wrongPasswordPattern = checkPasswordPattern($scope.userData.newPassword);
    }

    function checkPasswordPattern(str)
    {
        var re = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
        return !re.test(str);
    }

}

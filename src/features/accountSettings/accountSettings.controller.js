export default function AccountSettingsController(authService,$sessionStorage, $scope, $rootScope, $stateParams, $http, $location,$base64,toastr) {
    let accountSettings = this;
    $scope.userData = {};
    $scope.errorMessage;

    $http.get('/api/users/' + $rootScope.globals.currentUser.id).then(function (response) {
        $scope.userData.firstName = response.data.firstName;
        $scope.userData.lastName = response.data.lastName;
        $scope.userData.email = "";
        $scope.userData.password = "";
        if($sessionStorage.getObject('user').pass) {
            $scope.userData.password =  $base64.decode($sessionStorage.getObject('user').pass);
            $scope.userData.email = $sessionStorage.getObject('user').username;
        }else{
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
                    location.reload();
                }, function (error) {
                   console.log(error);

                });
            }
            $location.path("/accountSettings")
            toastr.success('User data successfully updated');
        }, function (res) {
            $scope.errorMsg = "Unable to update user";
            toastr.error('Update user data failed','Error');
        });
    };

    $scope.updateUserEmailAndPAss = function () {
        var userDataForEmail = {
            "password": $scope.userData.password,
            "email": $scope.userData.email,
            "newEmail": $scope.userData.newEmail
        };

        var userDataForPassword = {
            "password": $scope.userData.password,
            "newPassword": $scope.userData.newPassword,
        };

        $http.post('/api/account/email', userDataForEmail).then(function (res) {
            var successMessage = "User email ";
            $http.post('/api/account/password', userDataForPassword).then(function (res) {
                successMessage= successMessage + "and user password ";
                toastr.success(successMessage+'successfully updated');
            }, function (resp) {
                $scope.errorMsg = "Unable to update user";
                toastr.error('Update user data failed','Error');
            });
        }, function (res) {
            $scope.errorMsg = "Unable to update user";
            toastr.error('Update user data failed','Error');
        });
    };

    $scope.deleteUser = function () {
        if (confirm("Are you sure?") == true) {
            $location.path("/home")
            $http.delete('/api/users/' + $rootScope.globals.currentUser.id);
            authService.logout();
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

}

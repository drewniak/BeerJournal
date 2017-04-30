/**
 * Created by wojciech_dymek on 22.04.17.
 */
export default function AddNewItemController($scope,$rootScope, $http, $location, $uibModal,$base64) {
    let vm = this;
    vm.addNewItem = addNewItem;

    //TODO fix auth
    /*var authdata = $base64.encode('test@gmail.com' + ':' + 'test');
    $http.defaults.headers.common['Authorization'] = 'Basic ' + authdata;
    $rootScope.globals = {};
    $rootScope.globals.userId='58fbd2b5cc2b6604efeb28ed'*/

    function addNewItem() {
        vm.item.ownerId = $rootScope.globals.currentUser.id;

        $http.post('/api/users/' + vm.item.ownerId + "/collection/items", vm.item).then(function(res) {
            $location.path("/collections")
        }, function(res) {
            console.log(res);
            vm.errorMessage ="Unable to create new item";
        })
    }


    var modalInstance;

    $scope.open = function () {
        modalInstance = $uibModal.open({
            templateUrl: '/fileSelector.html',
            scope: $scope,
            windowClass: 'small'

        });
    };

    $scope.uploadFiles = function (files, errFiles) {
        $scope.files = files;
        $scope.errFiles = errFiles;

        angular.forEach(files, function (file) {
            var reader = new FileReader();
            reader.onload =
                (function (theFile) {
                    return function (e) {
                        $scope.$apply(function () {
                            reader.result; //tresc pliku
                            //ro something with your file
                        });
                    };
                })(file);
        });
        modalInstance.close();
    };


    $scope.previewFile = function() {
        var preview = document.querySelector('img');
        var file    = document.querySelector('input[type=file]').files[0];
        var reader  = new FileReader();
        document.getElementById("fname").value ; //string file url
        reader.addEventListener("load", function () {
            preview.src = reader.result;
        }, false);

        if (file) {
            reader.readAsDataURL(file);
        }
    }

}
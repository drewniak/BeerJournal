/**
 * Created by wojciech_dymek on 22.04.17.
 */
export default function AddNewItemController($scope,$rootScope, $http, $location, $uibModal, toastr, countriesProvider, WizardHandler) {
    let vm = this;
    vm.addNewItem = addNewItem;
    vm.countries = [];
    var video;

    countriesProvider.getCountries().then(function(countries) {
        vm.countries = countries;
    });

    function addNewItem() {
        vm.item.ownerId = $rootScope.globals.currentUser.id;
        vm.item.attributes = [];

        $http.post('/api/users/' + vm.item.ownerId + "/collection/items", vm.item).then(function(res) {
            toastr.success('Item successfully added');

            var itemId = res.data.id;

            if (vm.imageFile != null) {
                $scope.form = [];
                    $http({
                          method  : 'POST',
                          url     : '/api/users/' + vm.item.ownerId + '/collection/items/'+ itemId + '/images',
                          processData: false,
                          transformRequest: function (data) {
                              var formData = new FormData();
                              formData.append("file", vm.imageFile);
                              return formData;
                          },
                          data : $scope.form,
                          headers: {
                                 'Content-Type': undefined
                          }
                    }).then(function(res){
                        toastr.success('Image uploaded');
                        $location.path("/collections")
                    }, function (error) {
                        toastr.error('Image upload error');
                    });
            }
            $location.path("/collections")
        }, function(res) {
                console.log(res);
                toastr.error('Unable to add new item');
            })

    }

    $scope.turnOnCamera = function() {
        video = document.getElementById('video');

        if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia({ video: true }).then(function(stream) {
                $rootScope.localstream = stream;
                video.src = window.URL.createObjectURL(stream);
                video.load();
                video.play();
            });
        }

        $rootScope.cameraTurnedOn = true;
    }

    $scope.turnOffCamera = function() {
        video.pause();
        video.src="";
        $rootScope.localstream.getTracks()[0].stop();
        $rootScope.localstream = undefined;
        $rootScope.cameraTurnedOn = false;
    }

    $scope.takeSnap = function() {
        var canvas = document.getElementById('canvas');
        var context = canvas.getContext('2d');
        context.drawImage(video, 0, 0, 640, 480);

        vm.imageFile = dataURItoBlob(canvas.toDataURL("image/png"));

        $scope.imageFileAdded = true;
    }

    function dataURItoBlob(dataURI) {
        // convert base64/URLEncoded data component to raw binary data held in a string
        var byteString;
        if (dataURI.split(',')[0].indexOf('base64') >= 0)
            byteString = atob(dataURI.split(',')[1]);
        else
            byteString = unescape(dataURI.split(',')[1]);

        // separate out the mime component
        var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

        // write the bytes of the string to a typed array
        var ia = new Uint8Array(byteString.length);
        for (var i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }

        return new Blob([ia], {type:mimeString});
    }


    $scope.removeImage = function() {
        vm.imageFile = undefined;
        $scope.files = undefined;
        $scope.errFiles = undefined;
        $scope.imageFileAdded = false;

        var preview = document.querySelector('img');
        preview.src = '';
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
        var preview = document.getElementById('addedImage');
        var file    = document.querySelector('input[type=file]').files[0];
        var reader  = new FileReader();
        document.getElementById("fname").value ; //string file url
        reader.addEventListener("load", function () {
            preview.src = reader.result;
        }, false);

        if (file) {
            reader.readAsDataURL(file);
            vm.imageFile = file;
            $scope.$apply(function () {
                $scope.imageFileAdded = true;
            });
        }
    }

    $scope.breweryAutocomplete = function(searchText) {
        return $http
            .get('/api/categories/brewery/')
            .then(function(res) {
                return filterAutocompleteResults(searchText, res.data.values);
            });
    }

    $scope.typeAutocomplete = function(searchText) {
        return $http
            .get('/api/categories/type/')
            .then(function(res) {
                return filterAutocompleteResults(searchText, res.data.values);
            });
    }

    $scope.styleAutocomplete = function(searchText) {
        return $http
            .get('/api/categories/style/')
            .then(function(res) {
                return filterAutocompleteResults(searchText, res.data.values);
            });
    };

    function filterAutocompleteResults(searchText, results) {
        return results.filter(function(result) {
            return angular.lowercase(result).includes(angular.lowercase(searchText));
        });
    }

}
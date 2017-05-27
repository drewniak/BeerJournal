export default function AddNewItemController($scope,$rootScope, $http, $location, $uibModal, $uibModalInstance, toastr, countriesProvider, WizardHandler) {
    let vm = this;
    vm.operationType = "CREATE";
    vm.save = save;
    vm.item = {};
    vm.item.attributes=[];
    vm.removeAttribute = removeAttribute;
    vm.addNewAttribute = addNewAttribute;
    vm.countries = [];

    var video;
    $scope.modal = $uibModalInstance;
    vm.types = ['bottle','can','cap','label'];

    countriesProvider.getCountries().then(function(countries) {
        vm.countries = countries;
    });

    function save() {
        vm.item.ownerId = $rootScope.globals.currentUser.id;

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
            });
    }

    function addNewAttribute() {
        var newItemNo = vm.item.attributes.length+1;
        vm.item.attributes.push({'id':'attribute'+newItemNo});
    }

    function removeAttribute(attribute) {
        var index = vm.item.attributes.indexOf(attribute);
        if (index > -1)
            vm.item.attributes.splice(index, 1);
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
        vm.imageSrc = canvas.toDataURL("image/png");
        var blob =  dataURItoBlob(vm.imageSrc);
        vm.imageFile = new File([blob], 'snapshot.jpeg', {type: blob.type});

        $scope.imageFileAdded = true;
    }

    function dataURItoBlob(dataURI) {
        var byteString;
        if (dataURI.split(',')[0].indexOf('base64') >= 0)
            byteString = atob(dataURI.split(',')[1]);
        else
            byteString = unescape(dataURI.split(',')[1]);

        var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

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
        vm.imageSrc = '';
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
        var file    = document.querySelector('input[type=file]').files[0];
        var reader  = new FileReader();
        document.getElementById("fname").value ; //string file url
        reader.addEventListener("load", function () {
            $scope.$apply(function () {
                vm.imageSrc = reader.result;
            });
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
        return filterAutocompleteResults(searchText,$scope.types);
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
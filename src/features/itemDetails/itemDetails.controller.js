export default function itemDetailsController($rootScope, $scope, $http, $location, countriesProvider, Lightbox, toastr) {
    var itemID = $scope.itemId;
    var ownerID = $scope.ownerId;
    let user = $rootScope.globals.currentUser;
    $scope.item = {};
    $scope.rate = 0;
    $scope.readOnly = true;
    $scope.avgRate = 3;
    $scope.isMyItem = false;

    $http.get('/api/items/' + itemID).then(function(res) {
        $scope.item = res.data;
        countriesProvider.getCountryFlag(res.data.country)
                            .then(function(flag) {
                                $scope.item.countryImage =  flag;
                            });
        getItemImages(res.data.imageIds);
        if (res.data.ownerId != user.id) {
            $scope.isMyItem = false;
            $http.get('/api/users/' + res.data.ownerId).then(function(owner) {
                $scope.item.owner = owner.data;
            })
        }else{
            $scope.isMyItem = true;
        }

    });
    
    $scope.close = function () {
        $scope.$dismiss('cancel');
    };


    $scope.openLightboxModal = function (index,images) {
        Lightbox.openModal(images, index);
    };

    $scope.showUserCollection = function(user) {
        $location.path('/allUsers').search('id', user.id);
    }

    $scope.makeAnOffer = function(itemId) {
        close();
        $location.path('/selectItems').search('id', itemId);
    }

    $scope.onRating = function(rate) {
        if (rate == 0) {
            //TODO delete user rating
        } else {
            var body = {
                itemId: itemID,
                raterId: user.id,
                value: rate
            };

            $http.post("/api/ratings", body).then(function() {
                toastr.success("Item's rate was successfully updated", "");
                updateItemRate(itemId);
            }, function(res) {
                toastr.success("Something goes wrong :(", "Error");
                console.log(res);
            })
        }
    }

    function updateItemRate(itemId) {
        //TODO
    }

    function getItemImages(imageIds) {
        if(imageIds){
            $scope.item.images = [];
            angular.forEach(imageIds, function(imageId) {
                $scope.item.images.push('/api/files/' + imageId);
            });
        } else {
            $scope.item.images = ['http://www.howderfamily.com/graphics/howder-beer.jpg'];
        }
    }
}
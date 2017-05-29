export default function itemDetailsController($rootScope, $scope, $http, $location, countriesProvider, Lightbox, toastr) {
    var itemID = $scope.itemId;
    var ownerID = $scope.ownerId;
    let user = $rootScope.globals.currentUser;
    $scope.item = {};
    $scope.rate = 0;
    $scope.readOnly = true;
    $scope.isMyItem = false;

    $http.get('/api/items/' + itemID).then(function(res) {
        $scope.item = res.data;
        countriesProvider.getCountryFlag(res.data.country)
                            .then(function(flag) {
                                $scope.item.countryImage =  flag;
                            });
        getItemImages(res.data.imageIds);
        getUserRate($scope.item);
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
            getRating(itemID, user.id).then(function(rating) {
                $http.delete('/api/ratings?ratingId=' + rating.id).then(function(){
                        updateItemRate(itemID);
                    },
                    function(res) {
                        toastr.error("Unable to remove Your rate", "Error");
                        console.log(res);
                    })
            })
        } else {
            var body = {
                itemId: itemID,
                raterId: user.id,
                value: rate
            };

            $http.post("/api/ratings", body).then(function() {
                toastr.success("Item's rate was successfully updated", "");
                updateItemRate(itemID);
            }, function(res) {
                toastr.success("Something goes wrong :(", "Error");
                console.log(res);
            })
        }
    }

    function getRating(itemId, userId) {
        return $http.get('/api/ratings?itemId=' + itemId).then(function(res) {
            var result = undefined;
            res.data.forEach(function(rating) {
                if (rating.raterId == userId) {
                    result = rating;
                }
            });
            return result;
        });
    }

    function updateItemRate(itemId) {
        $http.get('/api/items/' + itemId).then(function(res) {
            $scope.item.averageRating = res.data.averageRating;
        });
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

    function getUserRate(item) {
        getRating(item.id, user.id).then(function(rating) {
            $scope.rate = rating.value;
        })
    }
}
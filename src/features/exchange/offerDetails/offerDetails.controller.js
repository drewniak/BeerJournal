export default function OfferDetailsController ($rootScope, $scope, $window, $http, $location, $uibModal, toastr) {
    let vm = this;
    vm.currentUser = $rootScope.globals.currentUser;
    vm.offeror = "";
    vm.owner = ""
    vm.desiredItem = {};
    vm.offeredItems = [];
    vm.showUserCollection = showUserCollection;
    vm.showItemDetails = showItemDetails;
    vm.exchangeCompleted = exchangeCompleted;
    vm.exchangeCancled = exchangeCancled;
    vm.exchangeRejected = exchangeRejected;

    vm.offerId = $location.search().offerId;
    vm.ownerId = $location.search().ownerId;

    $scope.back = function() {
        $window.history.back();
    }

    getExchangeOfferObject(vm.offerId, vm.ownerId).then(function(offer) {
        getItemDetails(offer.desiredItem.itemId).then(function(desiredItem) {
            vm.desiredItem = desiredItem;
            setItemImage(vm.desiredItem);
        });

        offer.offeredItems.forEach(function(offeredItem) {
            getItemDetails(offeredItem.itemId).then(function(offeredItem) {
                setItemImage(offeredItem);
                vm.offeredItems.push(offeredItem);
            })
        });

        getUser(offer.offerorId).then(function(offeror) {
            vm.offeror = offeror;
        })

        getUser(offer.ownerId).then(function(owner) {
            vm.owner = owner;
        })
    });

    function showItemDetails(itemId) {
        $scope.itemId = itemId;
        console.log($scope.itemId);
        var modalInstance = $uibModal.open({
            templateUrl: 'modals/itemDetails.html',
            scope: $scope
        }).result.finally(
            function() {
            }
        ).then(angular.noop, angular.noop);
    }

    function showUserCollection(userId) {
        $location.path('/allUsers').search('id', userId);
    }

    function getExchangeOfferObject(offerId, ownerId) {
        return $http.get('/api/exchanges?ownerId=' + ownerId).then(function(res) {
            var result = {}

            res.data.forEach(function(offer) {
                if (offer.id == offerId) {
                    result = offer;
                }
            });

            return result;
        })
    }

    function getItemDetails(itemId) {
        return $http.get('/api/items/' + itemId).then(function(res) {
            return res.data;
        });
    }

    function setItemImage(item) {
        if (item.imageIds.length > 0) {
            item.image = '/api/files/' + item.imageIds[0];
        } else {
            item.image = undefined;
        }
    }

    function getUser(userId) {
        return $http.get('/api/users/' + userId).then(function(res) {
            return res.data;
        })
    }

    function exchangeCompleted(offerId) {
        var body = {}
        body.performed = true;
        console.log(offerId);
        $http.put('/api/exchanges/' + offerId + '/status', body).then(function () {
            toastr.success("Exchange processed successfully", "");
            $location.path('/collections');
        }, function (res) {
            console.log(res);
            toastr.error("Unable to complete exchange...", "");
        })
    }

    function exchangeCancled(offerId) {
        toastr.info("In progress...", "");
    }

    function exchangeRejected(offerId) {
        toastr.info("In progress...", "");
    }
}
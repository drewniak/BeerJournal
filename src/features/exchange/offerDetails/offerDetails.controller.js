export default function OfferDetailsController ($rootScope, $scope, $window, $http, $location, $uibModal, toastr) {
    let vm = this;
    vm.currentUser = $rootScope.globals.currentUser;
    vm.offer = {};
    vm.offeror = "";
    vm.owner = ""
    vm.desiredItem = {};
    vm.offeredItems = [];
    vm.showUserCollection = showUserCollection;
    vm.showItemDetails = showItemDetails;
    vm.acceptOffer = acceptOffer;
    vm.exchangeCancled = exchangeCancled;
    vm.exchangeRejected = exchangeRejected;
    vm.negotiate = negotiate;
    vm.resendOffer = resendOffer;
    vm.completeExchange = completeExchange;

    vm.offerId = $location.search().offerId;

    $scope.back = function() {
        $window.history.back();
    }

    getExchangeOfferObject(vm.offerId).then(function(offer) {
        vm.offer = offer;
        vm.state = offer.state;

        getItemDetails(offer.desiredItems[0].itemId).then(function(desiredItem) {
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

    function getExchangeOfferObject(offerId) {
        return $http.get('/api/exchanges/' + offerId).then(function(res) {
            return res.data;
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

    function completeExchange(offerId) {
        $http.put('/api/exchanges/' + offerId + '/state', {state: "COMPLETED"}).then(function () {
            toastr.success("Exchange processed successfully", "");
            $location.path('/collections');
        }, function (res) {
            console.log(res);
            toastr.error("Unable to complete exchange...", "");
        })
    }

    function acceptOffer(offerId) {
        var state = undefined;

        if (vm.offeror.id == vm.currentUser.id) {
            state = "ACCEPTED_BY_OFFEROR";
        } else {
            state = "ACCEPTED_BY_OWNER";
        }

        $http.put('/api/exchanges/' + offerId + '/state', {state: state}).then(function () {
            toastr.success("Exchange processed successfully", "");
            $location.path('/collections');
        }, function (res) {
            console.log(res);
            toastr.error("Unable to accept exchange...", "");
        })
    }

    function negotiate() {
        $http.get('/api/users/' + vm.offeror.id + "/collection").then(function(res) {
            $scope.userItems = [];

            res.data.itemRefs.forEach(function(item) {
                getItemDetails(item.itemId).then(function(details) {
                    $scope.userItems.push(details);

                    vm.offeredItems.forEach(function(offeredItem) {
                        if (offeredItem.id == details.id) {
                            details.selected = true;
                            return;
                        }
                    })
                })
            })
        })
        vm.state = "negotiate";
    }

    function resendOffer() {
        var body = {
            desiredItemIds:[vm.desiredItem.id],
            offeredItemIds:[]
        };

        $scope.userItems.forEach(function(item) {
            if (item.selected) {
                body.offeredItemIds.push(item.id);
            }
        });

        var state = undefined;
        if (vm.offeror.id == vm.currentUser.id) {
            state = "WAITING_FOR_OWNER";
        } else {
            state = "WAITING_FOR_OFFEROR";
        }

        $http.put('/api/exchanges/{id}?exchangeId=' + vm.offerId, body).then(function() {
            $http.put('/api/exchanges/'+vm.offerId+'/state', {state: state}).then(function() {
                toastr.success("Offer send to offeror", "")
                location.reload();
            }, function(res) {
                toastr.error("Ops, sth went wrong :(", "Error");
            })
        }, function(res) {
            toastr.error("Ops, sth went wrong :(", "Error");
        })
    }

    function exchangeCancled(offerId) {
        $http.put('/api/exchanges/'+vm.offerId+'/state', {state: "CANCELED"}).then(function() {
            toastr.success("Offer canceled", "")
            location.reload();
        }, function(res) {
            toastr.error("Ops, sth went wrong :(", "Error");
        })
    }

    function exchangeRejected(offerId) {
        $http.put('/api/exchanges/'+vm.offerId+'/state', {state: "REJECTED"}).then(function() {
            toastr.success("Offer rejected", "")
            location.reload();
        }, function(res) {
            toastr.error("Ops, sth went wrong :(", "Error");
        })
    }
}
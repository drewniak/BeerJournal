export default function ClosedController($rootScope, $scope, $http, $location, $uibModal, moment) {

    let user = $rootScope.globals.currentUser;

    $scope.username = user.username;
    $scope.currentNavItem = "closed";
    $scope.offers = [];
    $scope.offerors = [];
    $scope.offeror = {};



    function getOffers () {
        $http.get('/api/exchanges?ownerId=' + user.id )
            .then(function (response) {
                $scope.offers = response.data;


            }, function (error) {
                console.log(error);
            });
    }


    $scope.showDetails = function(ownerId, offerId){
        $location.path('/offerDetails').search('offerId', offerId);
    }


    getOffers();
}


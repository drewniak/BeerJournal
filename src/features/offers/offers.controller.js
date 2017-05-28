export default function OffersController($rootScope, $scope, $http, $location, $uibModal, $window, moment) {

    
    let user = $rootScope.globals.currentUser;

    $scope.username = user.username;
    $scope.currentNavItem = "offers";
    $scope.offers = [];

    function getOffers () {
        $http.get('/api/exchanges?ownerId=' + user.id)
            .then(function (response) {
                $scope.offers = response.data;


            }, function (error) {
                console.log(error);
            });
    }

        function accept(id){
        console.log('accept');
        console.log(offerId);
        var offer = {
            "performed": "true"
        };
         $http.put('/api/exchanges/' + id + "/status", offer)
            .then(function (response) {
                        
            }, function (error) {
                console.log(error);
            });
}
         function reject(id){
        var offer = {
            "performed": "false"
        };
         $http.put('/api/exchanges/' + id + "/status", offer)
            .then(function (response) {r 
                        
            }, function (error) {
                console.log(error);
            });
}


$scope.showDetails = function(offerId){  
    $location.path('/offerDetails').search('ownerId', user.id).search('offerId', offerId);
}

$scope.offerFilter = function(state){
    return state === 'REJECTED' || state === 'CANCELED';
}

    
    getOffers();
 
}

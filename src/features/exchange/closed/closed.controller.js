export default function ClosedController($rootScope, $scope, $http, $location, $uibModal, moment) {

    let user = $rootScope.globals.currentUser;

    $scope.username = user.username;
    $scope.currentNavItem = "closed";
    $scope.currentTab = "completed";
    $scope.offers = [];
    $scope.offerors = [];
    $scope.offeror = {};

}


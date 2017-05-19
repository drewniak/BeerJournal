export default function StartController($scope,$interval) {
    $scope.image = "images/beer1.jpg"
    $scope.number = 0;
    $interval(function() {
        $scope.number++;
    }, 2000);

    var images = ["images/beer1.jpg","images/beer2.jpg","images/beer3.jpg"];
    $scope.imageClass = function() {
        $scope.image = images[$scope.number % images.length];
    };
}
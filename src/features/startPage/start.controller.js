export default function StartController($scope,$interval) {
    $scope.image = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhnDdt3T3qDnRgSFyR8rNNrqbtEzK1r_DhD3YsLgeYcqOcchleiw"
    $scope.number = 0;
    $interval(function() {
        $scope.number++;
    }, 2000);

    var images = ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhnDdt3T3qDnRgSFyR8rNNrqbtEzK1r_DhD3YsLgeYcqOcchleiw","http://davisbeerweek.com/wp-content/uploads/2016/06/Draft-Beer-1500x850.jpg","http://media.medicalbag.com/images/2016/02/09/evolution-of-craft-beers.jpg"];
    $scope.imageClass = function() {
        $scope.image = images[$scope.number % images.length];
    };
}



angular.module('Translator', [])
  .controller('dnatoaaController',['$scope', '$http', function($scope, $http){
$scope.done = false;
$scope.aaSeq;
$scope.genDNA=function(){

$http.post('http://localhost:9001/genDNA',{

arg:$scope.dnaSeq,
}).success(function(data) {
            $scope.aaSeq = data.output;
            $scope.done = true;


})};



}]);


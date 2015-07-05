angular.module('SteroidsApplication', [
  'supersonic'
])
.controller('IndexController', function($scope, supersonic) {

  Parse.initialize("WSA1398Zaliy9pauhvHEg5uzfvrqwH1bXdmwRW7e", "4EiQQjH6Hm6Lfnl172GMNDCorWyghusvACWEhg9I");

  $scope.restaurants = [];
  $scope.searchInput = function()
  {
    $scope.restaurants = [];
      var Restaurant = Parse.Object.extend("Restaurant");
      var query = new Parse.Query(Restaurant);
      var searhArray = $scope.searchValue.toLowerCase().split(" ");
      query.containedIn("foodTypes", searhArray);
      query.find({
        success: function(results) {
          for (var i = 0; i < results.length; i++) {
            var object = results[i].attributes;
            $scope.restaurants.push(object);
          }
          $scope.$apply();
        },
        error: function(error) {
          alert("Error: " + error.code + " " + error.message);
        }
      });
    }
});

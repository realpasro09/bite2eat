angular.module('SteroidsApplication', [
  'supersonic','toastr'
])
.controller('IndexController', function($scope, $location, supersonic, toastr) {

  Parse.initialize("WSA1398Zaliy9pauhvHEg5uzfvrqwH1bXdmwRW7e", "4EiQQjH6Hm6Lfnl172GMNDCorWyghusvACWEhg9I");
//localStorage.clear();
  $scope.restaurants = [];
  $scope.selectedRestaurant = localStorage.selectedRestaurant;
  if (localStorage.menuItems !== undefined) {
    $scope.menuItems = JSON.parse(localStorage.menuItems);
  }
  if (localStorage.cartItems !== undefined) {
    $scope.total =0;
    $scope.cartItems = JSON.parse(localStorage.cartItems);
    for(var i = $scope.cartItems.length - 1; i >= 0; i--) {
        $scope.total = $scope.total + $scope.cartItems[i].price;
    }
  }

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
            var object = results[i];
            $scope.restaurants.push(object);
          }
          $scope.$apply();
        },
        error: function(error) {
          alert("Error: " + error.code + " " + error.message);
        }
      });
    };
    $scope.menuItem = function(restaurant) {
      localStorage.setItem("selectedRestaurant", restaurant.attributes.name);
      // $location.path('http://localhost/portfolio-adaptive.html');
  			var MenuItem = Parse.Object.extend("MenuItem");
  			var query = new Parse.Query(MenuItem);
  			query.equalTo("restaurantId", restaurant.id);
  			query.find({
  				success: function(menuItems) {
            localStorage.setItem("menuItems", JSON.stringify(menuItems));
            window.location.replace("/portfolio-adaptive.html");
  				},
  				error: function(object, error) {
  					alert("Error: " + error.code + " " + error.message);
  				}
  			});
  		};
    function findById(source, name) {
      for (var i = 0; i < source.length; i++) {
        if (source[i].name === name) {
          return true;
        }
      }
      return false;
    };

    function notify(name) {
      var options = {
        buttonLabel: "Close"
      };

      supersonic.ui.dialog.alert(name + " added to the cart", options).then(function() {
      });
    }
    $scope.Paypal = function () {
      localStorage.clear();
      var options = {
        buttonLabel: "Close"
      };

      supersonic.ui.dialog.alert("Thanks for using Bite 2 Eat \n Your order will be delivered soon", options).then(function() {
        window.location.replace("/index.html");
      });
    }
    $scope.deleteItem = function (menuItem) {
      for(var i = $scope.cartItems.length - 1; i >= 0; i--) {
          if($scope.cartItems[i].name === menuItem.name) {
             $scope.cartItems.splice(i, 1);
          }
      }
      localStorage.setItem("cartItems", JSON.stringify($scope.cartItems));
      $scope.$apply();

    }
    $scope.addToCart = function (menuItem) {

      if (localStorage.cartItems !== undefined) {
        var result =findById($scope.cartItems, menuItem.name);
        if (!result) {
          $scope.cartItems = JSON.parse(localStorage.cartItems);
          $scope.cartItems.push(menuItem);
          localStorage.setItem("cartItems", JSON.stringify($scope.cartItems));
          notify(menuItem.name);
        }else {
          var options = {
            buttonLabel: "Close"
          };

          supersonic.ui.dialog.alert(menuItem.name + " was already added to the cart", options).then(function() {
          });
        }

      }else {
        $scope.cartItems = [];
        $scope.cartItems.push(menuItem);
        localStorage.setItem("cartItems", JSON.stringify($scope.cartItems));
        notify(menuItem.name);
      }

    };
});

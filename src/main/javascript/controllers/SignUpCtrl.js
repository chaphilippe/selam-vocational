angular.module('library.controllers')

.controller('signUpCtrl', function($scope, $location, userService, authService) {
  
  $scope.signup = function(user) {
    if (user.password != user.confirm) {
      $scope.error = 'Passwords must match';

    } else {
      userService.save(user,
        // success
        function(data) {
          authService.login(user.email, user.password).then(function() {
            $location.path('/books');
          });
          
        },
  
        // error
        function(response) {
          if (response.status == 409) { // Conflict
            $scope.error = 'This email address has already been registered, please use another.';
          }
        
        });

    }

  };

  $('#input-fullname').focus();

});


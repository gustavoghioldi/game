angular.module('starter.controllers', [])
.controller('GameCtrl', function($scope){

  $scope.alien_preference = [1, 2, 4, 5];

  $scope.players = ['blue', 'red', 'green', 'yellow'];

  $scope.player_blue_cards = [];
  $scope.read = function (player) {
      console.log(player);
      var count = 0;
      var asserts = 0;
      var scanner = new Instascan.Scanner({ video: document.getElementById('preview'), scanPeriod: 5  });
      scanner.addListener('scan', function (content) {
        alert("Marciano vio carta");
        for (i of $scope.alien_preference ) {
          if (i == content) asserts++;
        }

        count++;
        console.log(count);
        if (count==4) {
          console.log(player);

          scanner.stop();
          alert("Player "+player+" asserts: "+asserts);
          switch (player) {
            case 'blue':
              $player_blue_asserts = asserts;
              break;
            case 'red':
              $player_red_asserts = asserts;
              break;
            case 'green':
              $player_green_asserts = asserts;
              break;
            case 'yellow':
              $player_yellow_asserts = asserts;
              break;
          }
        };
      });
      Instascan.Camera.getCameras().then(function (cameras) {
        if (cameras.length > 0) {

          scanner.start(cameras[0]);
        } else {
          alert('No cameras found.');
        }
      }).catch(function (e) {
        console.error(e);
      });


  }
})
.controller('HomeCtrl', function($scope, $state){
  $scope.init = function() {
    alert("Iniciando Juego");
    $state.go('app.game');
  };
})
.controller('ReaderCtrl', function($scope, $state){
  var scanner = new Instascan.Scanner({ video: document.getElementById('preview'), scanPeriod: 5  });
  scanner.addListener('scan', function (content) {
    alert(content);
    $state.go('app.playlists');
  });
  Instascan.Camera.getCameras().then(function (cameras) {
    if (cameras.length > 0) {

      scanner.start(cameras[0]);
    } else {
      alert('No cameras found.');
    }
  }).catch(function (e) {
    console.error(e);
  });

})
.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
});

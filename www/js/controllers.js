angular.module('starter.controllers', [])
.controller('PreGameCtrl', function($scope, $state){
  $scope.init_game = function () {
    $state.go('app.game')
  }
})
.controller('GameCtrl', function($scope, $ionicModal){
  $scope.modal_random_clouse = function () {
    $scope.modal_event.hide();
  }
  $scope.random_event= "algo"
  $ionicModal.fromTemplateUrl('templates/modal_random.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal_event = modal;
    $scope.modal_event.show();
  });

/////funcion inicial////
$scope.alien_preference =  randomCards();
console.log($scope.alien_preference);
////fin funcion inicial
  $scope.buttonpositive = "button-positive";
  $scope.players = ['blue', 'red', 'green', 'yellow'];
  $scope.player_num = 0;
  $scope.player_now = $scope.players[$scope.player_num];
  $scope.round = 1;
  $scope.turn = 1;

  alert("Turno jugador: "+$scope.player_now);
  $scope.read = function () {
      var count = 0;
      var asserts = 0;
      var scanner = new Instascan.Scanner({ video: document.getElementById('preview'), scanPeriod: 5  });
      scanner.addListener('scan', function (content) {
        alert("Marciano vio carta");
        var audio = document.createElement('audio');
        audio.style.display = "none";
        audio.src = "https://benefitstorage.blob.core.windows.net/media/007741330_prev.mp3";
        audio.autoplay = true;
        audio.onended = function(){
          audio.remove() //Remove when played.
        };
        document.body.appendChild(audio);

        for (i of $scope.alien_preference ) {
          if (i == content) asserts++;
        }

        count++;
        console.log(count);
        $scope.turn++;

        if (count==4) {
          scanner.stop();
          console.log($scope.turn);


          $scope.random_event = "Player "+$scope.player_now+"\nCartas correctas: "+asserts;
          $scope.modal_event.show();
          $scope.player_num++;
          console.log($scope.player_num);
          $scope.player_now = $scope.players[$scope.player_num];

          if ($scope.turn == (16*3))
          {
            alert("Me voy a casa.. el marciano espera")
            $state.go('app.home');
          }

          if ($scope.turn % 16 == 0) {

            $scope.round++;
            alert("comienzo de Round "+$scope.round);
          }

          if ($scope.player_num == 3) {
            $scope.player_num=0;
          };
          alert("turno jugardor: "+$scope.player_now );
        };
      });

      Instascan.Camera.getCameras().then(function (cameras) {
        if (cameras.length > 0) {

          scanner.start(cameras[1]);
        } else {
          alert('No cameras found.');
        }
      }).catch(function (e) {
        console.error(e);
      });




  }
})
.controller('HomeCtrl', function($scope, $state){
  var audio = document.createElement('audio');
  audio.style.display = "none";
  audio.src = "https://benefitstorage.blob.core.windows.net/media/xfiles-expedientes-x-series-tv-.mp3";
  audio.autoplay = true;
  audio.onended = function(){
    audio.remove() //Remove when played.
  };
  document.body.appendChild(audio);
  $scope.init = function() {

    $state.go('app.pregame');
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

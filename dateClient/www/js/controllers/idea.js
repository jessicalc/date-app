// This is the controller for the individual date ideas - i.e. the one that has all the Foursquare venue details,
// including the address, opening hours, and map. 

angular.module('dateworthy.idea', ['ngOpenFB', 'ngCordova'])

.controller('IdeaCtrl', function($location, $ionicHistory, $q, $ionicLoading, $scope, $stateParams, DateData, LikeADate, FlagADate) {
  
  // $scope.initMap = function(latitude, longitude, name){
  //   console.log("Initiating Map...", latitude, longitude);
  //   var myLatlng = new google.maps.LatLng(latitude, longitude);
  //   var mapOptions = {
  //       center: myLatlng,
  //       zoom: 16,
  //       mapTypeId: google.maps.MapTypeId.ROADMAP
  //   };
  //   var venueMap = new google.maps.Map(document.getElementById("venueMap"), mapOptions);
  //   navigator.geolocation.getCurrentPosition(function(pos) {
  //     venueMap.setCenter(new google.maps.LatLng(latitude, longitude));
  //     var myLocation = new google.maps.Marker({
  //         position: new google.maps.LatLng(latitude, longitude),
  //         map: venueMap,
  //         title: name
  //     });
  //   });
  //   $scope.venueMap = venueMap;
  // };

  $scope.initMaps = function(ideas) {
    for (var i = 0; i < ideas.length; i++) {
      var latitude = ideas[i].location.lat;
      var longitude = ideas[i].location.lng;
      console.log("Initiating Map...", latitude, longitude);
      var myLatlng = new google.maps.LatLng(latitude, longitude);
      var mapOptions = {
          center: myLatlng,
          zoom: 16,
          mapTypeId: google.maps.MapTypeId.ROADMAP
      };
      // debugger;
      var venueMapId = "venueMap" + i;
      console.log("venueMapId is", venueMapId);
      var venueMap = new google.maps.Map(document.getElementById(venueMapId), mapOptions);
      navigator.geolocation.getCurrentPosition(function(pos) {
        venueMap.setCenter(new google.maps.LatLng(latitude, longitude));
        var myLocation = new google.maps.Marker({
            position: new google.maps.LatLng(latitude, longitude),
            map: venueMap,
            title: "a map"
        });
      });
    $scope["venueMap" + i] = venueMap;
    }
  }

  $scope.toggleDetails = function() {
    if ($scope.idea.detailsVisible === false) {
      $scope.idea.detailsVisible = true;
    } else {
      $scope.idea.detailsVisible = false; 
    }
  };

  $scope.$on('$stateChangeSuccess', function() {
    DateData.getDateIdeas(function(ideas) {
      $scope.ideas = ideas;
      console.log($scope.ideas);
      $scope.currentIdea = Number($stateParams.ideaId);
      $scope.imgWidth = window.innerWidth + 'px'; 
      console.log("innerwidth is", $scope.imgWidth);
      $scope.idea = $scope.ideas[$scope.currentIdea];
      $scope.idea.index = $scope.currentIdea;
      $scope.idea.last = false;
      console.log("$scope.idea.index", $scope.idea.index);
      if ($scope.idea.index === $scope.ideas.length - 1) {
        $scope.idea.last = true; 
      }
      $scope.idea.detailsVisible = false;
      setTimeout($scope.initMaps($scope.ideas), 500);
      // $scope.initMap($scope.idea.location.lat, $scope.idea.location.lng, $scope.idea.name);
    });
  });

  $scope.currentIdea = 0;


  $scope.showDetails = function() {
    console.log("Details should be vis now");
    $scope.idea.detailsVisible = true;
    console.log("$scope.idea.detailsVisible", $scope.idea.detailsVisible);
  }

  $scope.like = function() {
    var currentIdea = $scope.currentIdea;
    $scope.ideas[currentIdea].liked = 1;
    $scope.ideas[currentIdea].disliked = 0;
    var tagnames = DateData.getTags();
    for (var prop in tagnames) {
      if(tagnames[prop] !== undefined){
        LikeADate.increaseTagWeight(tagnames[prop], function(results){console.log(results)});
      }
    };
    LikeADate.markLikeDislike($scope.ideas[currentIdea].dateIdeaID, 1);
  }

  $scope.dislike = function() {
    var currentIdea = $scope.currentIdea;
    $scope.ideas[$scope.currentIdea].disliked = 1;
    $scope.ideas[$scope.currentIdea].liked = 0;  
    var tagnames = DateData.getTags();
    for (var prop in tagnames) {
      if(tagnames[prop] !== undefined){
        LikeADate.decreaseTagWeight(tagnames[prop], function(results){console.log(results)});
      }
    };
    LikeADate.markLikeDislike($scope.ideas[currentIdea].dateIdeaID, -1);
  };

  $scope.flagDate = function() {
    var dateIdeaID = $scope.ideas[$scope.currentIdea].dateIdeaID;
    FlagADate.flagDate(dateIdeaID);
  };

  $scope.nextIdea= function(){
    var next = Number($scope.currentIdea) + 1; 
    $location.path('/idea/' + next);
  };

  $scope.prevIdea= function(){
    var prev = Number($scope.currentIdea) - 1;
    $location.path('/idea/' + prev);
  };

  $scope.clearData = function(){
    $scope.ideas = [];
    $scope.currentIdea = 0;
    DateData.clearData();
    $location.path('/home');
  };

});
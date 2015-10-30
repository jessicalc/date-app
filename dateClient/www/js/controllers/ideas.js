// This is the controller for the initial ideas view - i.e. the carousel thing of three different ideas. 

angular.module('dateworthy.ideas', [])
.controller('IdeasCtrl', function($scope, $timeout, $location, DateData, LikeADate, FlagADate) {
  // Wrapping the `DateData.getDateIdeas` function call inside a $scope.on('$stateChangeSuccess') listener.
  // $stateChangeSuccess - fired once the state transition is complete (https://github.com/angular-ui/ui-router/wiki)
  $scope.ideas = {};
  $scope.imgWidth = window.innerWidth + 'px'; 
  

  $scope.$on('$stateChangeSuccess', function() {
    DateData.getDateIdeas(function(ideas) {
      console.log("Getting the scope ideas right now...");
      $scope.ideas = ideas;
    });
  });
  $scope.currentIdea = 0;

  $scope.nextIdea= function(){
    $scope.currentIdea++;
  };

  $scope.prevIdea= function(){
    $scope.currentIdea--;
  };

  $scope.isCurrent = function(idea){
    return $scope.ideas[$scope.currentIdea].idea === idea;
  };

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
  }

  $scope.isLast = function( idea ) {
    return $scope.currentIdea === $scope.ideas.length - 1;
  };

  $scope.isFirst = function( idea ) {
    return $scope.currentIdea === 0;
  };

  $scope.clearData = function(){
    $scope.ideas = [];
    $scope.currentIdea = 0;
    DateData.clearData();
    $location.path('/home');
  };

  $scope.flagDate = function() {
    var dateIdeaID = $scope.ideas[$scope.currentIdea].dateIdeaID;
    FlagADate.flagDate(dateIdeaID);
  };


  $scope.showDetails = function() {
    console.log("Details should be vis now");
    $scope.idea.detailsVisible = true;
    console.log("$scope.idea.detailsVisible", $scope.idea.detailsVisible);
  }
  
})
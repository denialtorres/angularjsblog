'use stric'

angular.module('myApp.blog',['ngRoute'])

.config(['$routeProvider', function($routeProvider){
  $routeProvider.when('/blog',{
    templateUrl: 'blog/blog.html',
    controller: 'BlogCtrl'
  });
}])

.controller('BlogCtrl', function($scope, $firebaseArray, $firebaseObject, $firebase ){
  console.log('Estas en Blog');
  var codeRef = firebase.database().ref('Articles/');
  $scope.articles = $firebaseArray(codeRef);
  console.log($scope.articles.text)

  $('.post-module').hover(function() {
    $(this).find('.description').stop().animate({
      height: "toggle",
      opacity: "toggle"
    }, 300);
  });
});

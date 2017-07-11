angular.module('myApp.showArticle', ['ngRoute'])

.config(['$routeProvider',function($routeProvider){
  $routeProvider.when('/articulo/:id', {
    templateUrl: 'showArticle/showArticle.html',
    controller: 'ShowArticleCtrl'
  });
}])

.directive('fbCommentBox', function() {
  function createHTML(href, numposts, colorscheme, width) {
    return '<div class="fb-comments" ' +
      'data-href="' + href + '" ' +
      'data-numposts="' + numposts + '" ' +
      'data-colorsheme="' + colorscheme + '" ' +
      'data-width="' + width + '">' +
      '</div>';
  }

  return {
    restrict: 'A',
    scope: {},
    link: function postLink(scope, elem, attrs) {
      attrs.$observe('pageHref', function(newValue) {
        var href = newValue;
        var numposts = attrs.numposts || 5;
        var colorscheme = attrs.colorscheme || 'light';
        var width = attrs.width || '100%';
        elem.html(createHTML(href, numposts, colorscheme, width));
        FB.XFBML.parse(elem[0]);
      });
    }
  };
})


.controller('ShowArticleCtrl', ['$scope', '$routeParams','$firebaseArray', '$firebase', '$location', function($scope, $routeParams, $firebaseArray, $firebase, $location){
  console.log('Estas en Show Article Controller')
  console.log($location.absUrl())
  console.log("Your ID is " + $routeParams.id)
  $scope.fbComments = $location.absUrl();
  var ref = firebase.database().ref('/Articles/');
  var obj = $firebaseArray(ref);
  obj.$loaded().then(function(tasks) {
    $scope.post = tasks.$getRecord($routeParams.id);
  });
}]);

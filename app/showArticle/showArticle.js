angular.module('myApp.showArticle', ['ngRoute'])

.config(['$routeProvider',function($routeProvider){
  $routeProvider.when('/articulo/:id', {
    templateUrl: 'showArticle/showArticle.html',
    controller: 'ShowArticleCtrl'
  });
}])


.directive('facebookComments', ['$location', function ($location) {
  return {
      restrict: 'E',
      templateUrl: "scripts/directives/facebookComments.html",
      scope:{},
      replace: true,
      link: function(scope, el, attr){
        scope.curPath = $location.absUrl();
      }
   };
}])


.directive('dynFbCommentBox',['$timeout', function ($timeout) {
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
          //
          // Use timeout in order to be called after all watches are done and FB script is loaded
          //
          attrs.$observe('pageHref', function (newValue) {
              var href        = newValue;
              var numposts    = attrs.numposts    || 5;
              var colorscheme = attrs.colorscheme || 'light';
              var width = attrs.width || '100%';
              elem.html(createHTML(href, numposts, colorscheme, width));
              $timeout(function () {
                if (typeof FB != 'undefined'){
                    FB.XFBML.parse(elem[0]);
                  }
              });
          });

          
        }
    };
}])

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

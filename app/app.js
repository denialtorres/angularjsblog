'use strict';

angular.module('myApp', [
  'ngRoute',
  'myApp.home',
  'myApp.welcome',
  'myApp.addPost',
  'myApp.blog',
  'myApp.showArticle'//Newly added home module
]).
config(['$routeProvider', function($routeProvider){
  //Routes will be here
  //Set default view of our app to home
  $routeProvider.otherwise({
    redirectTo: '/home'
  })
}]);

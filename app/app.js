'use strict';

angular.module('myApp', [
  'ngRoute',
  'myApp.home',
  'myApp.welcome',
  'myApp.addPost' //Newly added home module
]).
config(['$routeProvider', function($routeProvider){
  //Routes will be here
  //Set default view of our app to home
  $routeProvider.otherwise({
    redirectTo: '/home'
  })
}]);

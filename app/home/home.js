'use strict'

angular.module('myApp.home',['ngRoute','firebase', 'ngQuill', 'ngSanitize', 'naif.base64'])

// Declared Route
.config(['$routeProvider', function($routeProvider){
  $routeProvider.when('/home',{
    templateUrl: 'home/home.html',
    controller: 'HomeCrtl'
  });
}])


//Home Controller
.controller('HomeCrtl', function($scope, $firebaseObject, $firebaseAuth, $location, CommonProp){

 // This is important for initialize variables
 $scope.username = CommonProp.getUser();
 if($scope.username){
   $location.path('/welcome');
  }

 $scope.user ={};

  var login = {};
  $scope.login = login;
 //important Shit
  var auth = $firebaseAuth();
  $scope.SignIn = function($scope){
  login.loading = true;
  var username = $scope.mail;
  var password = $scope.password;

    auth.$signInWithEmailAndPassword(username, password).then(function(firebaseUser) {
        login.loading = false;
        console.log("Signed in as:", firebaseUser.uid);
        CommonProp.setUser(username);
        $location.path('/welcome');
      }).catch(function(error) {
        login.loading = false;
        console.log("Authentication failed:", error);
      });
  }
})


//Service for store data login
.service('CommonProp', function(){
  console.log('Estas en CommonProp')
  var user = '';

  return {
    getUser: function(){
      if(user == ''){
        user = localStorage.getItem('userEmail');
      }
      return user;
    },
    setUser: function(value){
      localStorage.setItem("userEmail", value)
      user = value;
    }
  }
})

//Directive for Ladda
.directive('laddaLoading', [
  function(){
    return {
      link: function(scope, element, attrs){
        var Ladda = window.Ladda;
        var ladda = Ladda.create(element[0]);
        // Watching login.loading for change
        scope.$watch(attrs.laddaLoading, function(newVal, oldVal){
          //Based on the value start and stop indicator
          if(newVal){
            ladda.start();
          }else {
            ladda.stop();
          }
        });
      }
    };
  }
]);

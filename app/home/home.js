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
.controller('HomeCrtl', function($scope, $firebaseObject, $firebaseAuth, $location, CommonProp, $rootScope){

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
.service('CommonProp', function($location, $firebaseAuth, $rootScope){
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
    },
    logoutUser: function(){
      //log out user
      var auth = $firebaseAuth();
      firebase.auth().signOut().then(function() {
      console.log('Sign-out successful')
      }, function(error) {
      console.log('An error happened.')
      });
      console.log('done logout');
      user= '';
      localStorage.removeItem('userEmail');
      $location.path('/home');
    },
    isLogged: function(){
      //verify if user is logged in blog
      if (localStorage.getItem("userEmail") === null) {
      console.log('No Existe');
      $location.path('/home');
      }
    },
   isAdmin: function(){
     if (localStorage.getItem("userEmail") === null)
       return 'notAdmin'
     else
       return 'Admin'
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

'use strict'

angular.module('myApp.welcome', ['ngRoute'])

.config(['$routeProvider', function($routeProvider){
  $routeProvider.when('/welcome', {
    templateUrl: 'welcome/welcome.html',
    controller: 'WelcomeCtrl'
  });
}])

.controller('WelcomeCtrl', function($rootScope, $scope,CommonProp, $firebaseArray, $firebaseObject, $firebase ){
console.log('Estas en WelcomeCtrl');

CommonProp.isLogged();


function openPopup(){
  $('#editModal').modal();
}


  var codeRef = firebase.database().ref('Articles/');
  $scope.articles = $firebaseArray(codeRef);
  console.log($scope.articles)
  $scope.editPost = function(id){
    console.log(' El id es  ' + id)
    firebase.database().ref('/Articles/' + id).once('value').then(function(snapshot){
    $rootScope.postToUpdate = snapshot.val()
    $rootScope.postToUpdate.id = id;
    console.log($rootScope.postToUpdate.text)
    $rootScope.$apply();
  }).then(function(rest){setTimeout(openPopup, 200)})
     // triggers the modal

  }

  //Update function
  $scope.update = function(){
    console.log($rootScope.postToUpdate.title)
    var ref = firebase.database().ref('/Articles/' + $rootScope.postToUpdate.id)
    var obj = $firebaseObject(ref);
    obj.text = $rootScope.postToUpdate.text;
    obj.title = $rootScope.postToUpdate.title;
    obj.$save().then(function(ref) {
      $('#editModal').modal('hide');
    }, function(error) {
      console.log("Error:", error);
    });
  }

//Delete function
$scope.confirmDelete = function(id){
  var ref = firebase.database().ref('/Articles/' + id);
  var obj = $firebaseObject(ref);
  $scope.postToDelete = obj;
  $('#deleteModal').modal();
}

$scope.deletePost = function(){
  var ref = firebase.database().ref('/Articles/' + $scope.postToDelete.$id);
  var obj = $firebaseObject(ref);

  obj.$remove().then(function(ref){
    //data has been deleted locally and in the database
    console.log('borrado');
    $('#deleteModal').modal('hide');
  }, function(error){
    console.log("Error: ", error);
  });
}


$scope.logout = function(){
    CommonProp.logoutUser();
}

});

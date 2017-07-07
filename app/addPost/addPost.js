'use strict'

angular.module('myApp.addPost', ['ngRoute'])

.config(['$routeProvider', function($routeProvider){
  $routeProvider.when('/addPost', {
    templateUrl: 'addPost/addPost.html',
    controller: 'AddPostCrl'
  });
}])

.controller('AddPostCrl', ['$scope', '$firebase','CommonProp', '$location', '$firebaseArray', function($scope, $firebase,CommonProp, $location, $firebaseArray){
  CommonProp.isLogged();


  $scope.AddPost = function(){
    var ref = firebase.database().ref('Articles/');
    var list = $firebaseArray(ref)
    console.log('vas a publicar articulo')

    //imageurl: $scope.article.imageur,

    list.$add({title: $scope.article.title,
              text: $scope.article.post,
              imageurl: '',
              emailId: CommonProp.getUser()}).then(function(ref){
      var id = ref.key;
      console.log("added record with id " + id)
      list.$indexFor(id)
      $location.path('/welcome');
    });


  }

  $scope.pressed = function(){
    var a = document.getElementById('aa');
      if(a.value == "")
      {
          fileLabel.innerHTML = "Choose file";
      }
      else
      {
          var theSplit = a.value.split('\\');
          fileLabel.innerHTML = theSplit[theSplit.length-1];
      }
  }

  $scope.logout = function(){
    CommonProp.logoutUser();
  }

}]);

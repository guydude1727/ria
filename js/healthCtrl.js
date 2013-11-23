/*
 *  RIA Group Project: Nutrition Goals App
 *  
 *  Authors: Nathan Robinson, Matt 'Big Lew' Lewis, Stephen Brough
 *  Version: 0.0.1  
 *  Date: November 14, 2013
 *  Summary: A health app that will track your goals entered and give meal suggestions based on your
 *           current goals
 *
 */
 
// Some global variable crap
var couchDB = 'http://127.0.0.1:5984'; // CouchDB IP address; Using a local address for developing
var nutritionDB = '/nutrition';
var nutritionDoc = '/nutritionDoc';

// DB stuffs
var key = "";
var rev = "";

// Create variable holding the module object that we'll put all our crap on
var healthCtrl = angular.module('healthCtrl', []);

// Add controller to app angular module 
healthCtrl.controller('healthCtrl', ['$scope', '$http', '$location', function($scope, $http, $location) {

  $scope.templateStates = {
    DIARY: 0,
    NUTRITION: 3,
    SETTINGS: 6
  };
  // Templates for the app; These are the pages yo!
	$scope.templates = 
		[ { name: 'diary.html', url: 'templates/diary.html'}
		, { name: 'detail.html', url: 'templates/detail.html'}
		, { name: 'add.html', url: 'templates/add.html'}
		, { name: 'nutrition.html', url: 'templates/nutrition.html'}
		, { name: 'recent.html', url: 'templates/recent.html'}
		, { name: 'scan.html', url: 'templates/scan.html'}
		, { name: 'settings.html', url: 'templates/settings.html'}];
	$scope.template = $scope.templates[0];
  
  //initApp($http);
  
  $scope.switchView = function(url) {
    console.log("CLICKED");
    $('.include-example').attr('data-ng-include', url);
  };
  
}]);

healthCtrl.controller('NutritionCtrl', function($scope) {
  $scope.helloWorld="This is coming from the Details controller";
});

healthCtrl.controller('SettingsCtrl', function($scope) {
  $scope.helloWorld="This is coming from the Details controller";
});

/*
 * A directive for displaying Row items in the Diary view 
 */
 healthCtrl.directive('diaryEntry', function(){
  return {
    restrict: 'A',
    templateUrl: 'templates/layouts/diaryEntry.html', 
    link: function(scope, elem, attrs) {
      console.log("I see your directive and raise you fitty!");
    }
  }
 })


function initApp($http) {
  var documents;
	$http({method: 'GET', url: '/couchdb/nutrition/_all_docs'}).
    success(function(data, status, headers, config) {
      // Assuming that the first document is the one we want... which it should be
      var docs = data.rows[0]; 
      key = data.rows[0].key;
      rev = data.rows[0].value.rev;
      // Now grab all the documents with the key we just got
      $http({method: 'GET', url: '/couchdb/nutrition/'+key}).
        success(function(data){
          console.log("GOT DOCUMENT: " + data.docs[0].sugar);
        }).
        error(function(){})
      console.log("Key: " + key + "\nRevision: " + rev);
    }).
    error(function(data, status, headers, config){})
}


/*
 *  Adds an entry to the local CouchDB (change ip for production)
 *
 *  @params: $http, foodObject
 *  @returns: null
 */

function add($http, foodObject){
  $http({method: 'POST', url: '/couchdb/nutrition/' + key}).
  success(function(data, status, headers, config){
    
  }).
  error(function(data, status, headers, config){}
  
  );
}
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
 
// Create app module
var app = angular.module("healthApp", []);

// Add controller to app angular module 
app.controller("templateController", function($scope, $http) {
	$scope.templates = 
		[ { name: 'diary.html', url: 'templates/diary.html'}
		, { name: 'detail.html', url: 'templates/detail.html'}
		, { name: 'add.html', url: 'templates/add.html'}
		, { name: 'nutrition.html', url: 'templates/nutrition.html'}
		, { name: 'recent.html', url: 'templates/recent.html'}
		, { name: 'scan.html', url: 'templates/scan.html'}
		, { name: 'settings.html', url: 'templates/settings.html'}];
	$scope.template = $scope.templates[0];
  
  
  initApp($http);
});


function initApp($http) {
	$http({method: 'GET', url: '/couchdb/nutrition/_all_docs'}).
    success(function(data, status, headers, config) {
      var docs = data.rows[0]; 
      key = data.rows[0].key;
      rev = data.rows[0].value.rev;
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
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
 
// Create app module
var app = angular.module("healthApp", []);

// Add controller to app angular module 
app.controller("templateController", function($scope) {
	$scope.templates = 
		[ { name: 'diary.html', url: 'templates/diary.html'}
		, { name: 'detail.html', url: 'templates/detail.html'}
		, { name: 'add.html', url: 'templates/add.html'}
		, { name: 'nutrition.html', url: 'templates/nutrition.html'}
		, { name: 'recent.html', url: 'templates/recent.html'}
		, { name: 'scan.html', url: 'templates/scan.html'}
		, { name: 'settings.html', url: 'templates/settings.html'}];
	$scope.template = $scope.templates[0];
});


function searchContext($scope, $resource) {
	var dbResource = $resource('127.0.0.1:5984/ria_group/_all_docs',
	{nutrition: {method:'GET'}});	
}


/*
 *  Adds an entry to the local CouchDB (change ip for production)
 *
 *  @params: $http, foodObject
 *  @returns: null
 */

function add($http, foodObject){


}
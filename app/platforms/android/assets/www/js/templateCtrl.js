/*
 *  RIA Group Project: Nutrition Goals App
 *  
 *  Authors: Nathan Robinson, Matt 'Big Lew' Lewis, Stephen Brough
 *  Version: 0.0.1  
 *  Date: November 16, 2013
 *  Summary: The main app module with app configurations.
 *
 */

/************ DATABASE STUFF *************/
 
// Some global variable crap
var couchDB = 'http://127.0.0.1:5984'; // CouchDB IP address; Using a local address for developing
var nutritionDB = '/nutrition';
var nutritionDoc = '/nutritionDoc';


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
 

/*****************************************/
 
var templateCtrl = angular.module('templateCtrl', []);
 
templateCtrl.controller('DiaryCtrl', function($scope) {
  $scope.helloWorld="This is coming from the Diary controller";
});

templateCtrl.controller('DetailCtrl', function($scope, $routeParams) {
  $scope.barcode = $routeParams.barcode;
  console.log("ID: " + $scope.barcode);
  $scope.helloWorld="This is coming from the Details controller";
});

templateCtrl.controller('AddCtrl', function($scope, $http) {
  $scope.hello = "This is coming from the Add controller";
  $scope.foodData = "";  
  // Get local JSON dummy data
  $http.get('db.json').success(function(data){
    console.log("Dummy data: " + JSON.stringify(data));
    $scope.foodData = data.docs;
    });
  
  
});

templateCtrl.controller('NutritionCtrl', function($scope) {
  $scope.helloWorld="This is coming from the Nutrition controller";
});

templateCtrl.controller('RecentCtrl', function($scope) {
  $scope.helloWorld="This is coming from the Recent controller";
});

templateCtrl.controller('ScanCtrl', function($scope, $location, $window) {
  $scope.hello = "This is coming from the Scan controller";
  $scope.onBodyLoad = function() {
            document.addEventListener("deviceready", onDeviceReady, false);
          };

  $scope.success = function (resultArray) {
            //alert("Scanned " + resultArray[0] + " code: " + resultArray[1]);
            //$location.url('#/newItem');              
            $window.location.href = '#/newItem/' + resultArray[0];
          };

          $scope.failure = function(error) {
            alert("Failed: " + error);
          };

          $scope.scan = function() {
            // See below for all available options. 
            cordova.exec($scope.success, $scope.failure, "ScanditSDK", "scan",
              [
                "RfjeBlP5EeOcWPW7nuxYd/Dxk/0mrz+1Sbf9LBpCkxk",
                {
                  "beep": true,
                  "1DScanning" : true,
                  "2DScanning" : true
                }
              ]
            );
                
          }; 
});

templateCtrl.controller('SettingsCtrl', function($scope) {
  $scope.hello = "This is coming from the Settings controller";
});

templateCtrl.controller('NewItemCtrl', function($scope, $routeParams, $http) {
  alert("Got this barcode: " + $routeParams.barcode);
  $scope.uploadNewItem = function() {
    console.log("Clicked on the thing");
    if (key == null)
      initApp($http);
    var id = 'cbfed6b466fd27adc8d22b44d50019e2';
    var rev = '2-616ba2ed3318676316d9919b73fed046';
    var url = '/couchdb/nutrition/' + id;
    var info = {
      "_id":id,
      "_rev": rev,
      "test": {
                "_id": "thing",
                "sugar": 50,
                "cholesterol": 50
              }
    };
    $http({method: 'PUT', url:'127.0.0.1:5984/couchdb/nutrition/_all_docs', data:info})
    .success(function(data, status, headers, config) {
       console.log("SUCCESSFUL");})
    .error(function(data, status, headers, config){
      console.log("ERROR SENDING TO SERVER");
      console.log("Status: " + status);
      console.log("DATA: " + data);
    });
  };  
});
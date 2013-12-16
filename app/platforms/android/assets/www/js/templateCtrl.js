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

// Global vars for the local WebSQLite Database
var db;
var db_name = 'nutrition_db';
var table_name = 'diary';

var KEY_NAME = 'name';
var KEY_CATEGORY = 'category';
var KEY_SERVINGS = 'servings';
var KEY_BARCODE = 'barcode';

///////////////////////////////////////////////

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
 
 // Create SQLite database when the device is READY FOR SOME FOOTBALL
document.addEventListener('deviceready', onDeviceReady);
function onDeviceReady() {
  //var db = window.sqlitePlugin.openDatabase({name: "db_name"}); 
  db = window.openDatabase(db_name, 
    '1.0', 
    'Nutrition App Diary Database', 
    2*1024*1024);  
  function createSchema(tx){
    tx.executeSql('CREATE TABLE IF NOT EXISTS ' + table_name + '( \
      id INTEGER PRIMARY KEY AUTOINCREMENT, ' +
      KEY_NAME + ' TEXT, ' +
      KEY_CATEGORY + ' TEXT, ' +
      KEY_SERVINGS + ' INTEGER, ' +
      KEY_BARCODE + ' TEXT)');
  }
  
  function errorInSchema(){alert('Error creating schema');}
  function successInSchema(){alert('Schema creation successful');}
  db.transaction(createSchema, errorInSchema, successInSchema);
  }
 
var templateCtrl = angular.module('templateCtrl', []);
 
/*
 * Controller for Diary Page
 */
templateCtrl.controller('DiaryCtrl', function($scope) {
  $scope.helloWorld="This is coming from the Diary controller";
  
  
});

/*
 * Controller for Detail Page
 */
templateCtrl.controller('DetailCtrl', function($scope, $http, $routeParams) {
  $scope.barcode = $routeParams.barcode;
  $scope.category = $routeParams.category;
  alert("Barcode: " + $scope.barcode + "\nCategory: " + $scope.category);
  $scope.foodItem = {};
  
  // Get entries in local json file/database
  $http.get('db.json').success(function(data){    
    for (index in data.docs) {
      // Finds first instance of the object with a matching barcode      
      if(data.docs[index].barcode == $scope.barcode) {
        $scope.foodItem = data.docs[index];        
        break;
      }
    }
  });
  
  // Method for adding an entry to the local Diary database
  $scope.addEntry = function() {
    db.transaction(addEntrySql, error, success);   
  };
  
  // Long SQL statement to put everything in its place! GIT 'R DUN!!!
  var addEntrySql = function(tx) {
     tx.executeSql('INSERT INTO ' + table_name + '(' +
     KEY_NAME + ', ' + 
     KEY_CATEGORY + ', ' + 
     KEY_SERVINGS + ', ' + 
     KEY_BARCODE + ') ' + 
     'VALUES ("' + $scope.foodName + '", ' + 
     '"' + $scope.category + '", ' +
     $scope.servings + ', ' +
     '"' + $scope.barcode + '")');     
  };
  // Callbacks for the SQLite DB transaction  
  function error(){alert('Error Adding Diary Entry');}
  function success(){alert('Added Diary Entry! \n Added: \n ' + $scope.foodItem.key +','+$scope.category+','+$scope.servings+','+$scope.barcode);}
  console.log("ID: " + $scope.barcode);  
});

/*
 * Controller for Add Page
 */
templateCtrl.controller('AddCtrl', function($scope, $http, $routeParams) {  
  $scope.category = $routeParams.category;
  $scope.hello = "This is coming from the Add controller";
  $scope.foodData = "";  
  // Get local JSON dummy data
  $http.get('db.json').success(function(data){
    //console.log("Dummy data: " + JSON.stringify(data));
    $scope.foodData = data.docs;
    });
});

/*
 * Controller for Nutrition Page
 */
templateCtrl.controller('NutritionCtrl', function($scope) {
  $scope.helloWorld="This is coming from the Nutrition controller";
});

/*
 * Controller for Recent Page
 */
templateCtrl.controller('RecentCtrl', function($scope) {
  $scope.helloWorld="This is coming from the Recent controller";
});


/*
 * Controller for Scan Page
 */
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

/*
 * Controller for Settings Page
 */
templateCtrl.controller('SettingsCtrl', function($scope) {
  $scope.hello = "This is coming from the Settings controller";
});


/*
 * Controller for New Item Page
 */
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
RIA Group Project: Health App Calculator/Tracker/Trainer/Game/Goal Maker/Helper/Make-Me-Lose-Weight-Now-Thingy
===

Download files, put them into your apache 'www' folder and then do the thing. The db.json will contain the CouchDB JSON 
that you should curl to your running CouchDB database (Note: Anything in '[]' is optional. In this case, if you have setup 
an admin account, you'll have to enter your credentials):

Ex:
curl -X PUT http://[username:password@]127.0.0.1:5984/nutrition/
curl -X POST http://127.0.0.1:5984/nutrition/ -d @db.json -H "Content-Type: application/json"

CouchDB should return something like this:
{"ok":true,"id":"c6e2f3d7f8d0c91ce7938e9c0800131c","rev":"1-abadd48a09c270047658dbc38dc8a892"}


Database Design:

Tool: No-SQL using CouchDB

Database: Nutrition
Document (a.k.a. table): Facts

Each field in the 'Facts' document should have at least the following (currently WIP):
* Sugar
* Cholesterol
* Calories
* Sodium
* Potassium
* 

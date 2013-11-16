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


In order to get CouchDB to work with Apache (and avoid the Same Origin Policy/Cross Domain/Cross Origin/Same Domain/Cross Domain Same Origin Policy) issues, you'll have to do some configuring in Apache and enable a module called mod_proxy. And configure the ProxyPass directive.

So... to do that, you'll have to open your Apache configuration file (httpd.conf). On Wamp, this is found under [where ever you installed wamp]/bin/apache/apache#.##/conf. I assume it's basically the same for Mamp (NATE!!!). Open up the httpd.conf file (Notepad++ works great... Nate, hopefully text wrangler or sublime will open it up and keep the nice formatting). 

Go to around line 100, you should see a line with the text '#LoadModule proxy_module modules/mod_proxy.so'. Remove the '#'. Go down a few lines and you'll see one that says 'LoadModule proxy_http_module modules/mod_proxy_http.so'. Remove the '#' again. AFter that, go up to somewhere around line 165 (should be below the stuff about the ServerAdmin). I added a comment using '#'s saying that I'm using the following line for CouchDB proxying. Comment or no, add this line: 'ProxyPass /couchdb http://127.0.0.1:5984' (assuming your CouchDB is running on that URL and port... you can check by opening up Futon and looking at the URL address in the browser). After you do this, exit the Wamp/Mamp server (it has to be restarted). Then start it back up. Then go take a shower, you're a dirty proxy hacker. Now that you're clean, it should work! If it doesn't, I'm going to get really angry and turn green and have to Google whatever errors you're still getting.



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

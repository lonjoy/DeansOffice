/* Opening SQLite3 Database. */
var sqlite3 = require("sqlite3").verbose();
var fs = require("fs");

var file = "public/office.db3";
var db = new sqlite3.Database(file);

/* Handling routes. */

module.exports=function(app)
{
	app.get('/', function(req, res) {
		db.all('SELECT Name FROM Groups', function(error, rows) {
			if(error != null)
				res.status(500).send('Sorry, an error has occurred. Stacktrace below. \n' + error);
			else {
				var responseArgs = "";
				for(var i=0; i<rows.length; i++)
					responseArgs += (rows[i].Name + '\n');
				res.render('index', {groupNames: responseArgs.trim()});
			}
		});
		
	});
}
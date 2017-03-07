// INI EXPRESS. 
var express = require('express');
var app = express();


// CORS
// Add headers
app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});



app.get('/node/help', function(request, response) {
	var fs = require('fs');
	var path = require('path');
	var htmlFile = request.param('html', null);

	var MyFileData = path.join(__dirname, htmlFile);
	if (fs.existsSync(MyFileData)){
		var content = fs.readFileSync(MyFileData);
		response.send(content);
	}else{
		response.send("FILE " + htmlFile + " DOES NOT EXISTS");
	};
    
});


app.get('/*', function (request, response) {
    response.send("all");
});



// END APPLIST 
app.listen(process.env.PORT);

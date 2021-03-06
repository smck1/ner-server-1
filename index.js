// index.js

var express = require('express');
var bodyParser = require('body-parser');
var spawn = require('child_process').spawn;
var _ = require('underscore');

var app = express();
app.use(bodyParser.json({limit: '50mb'}));

var port = process.argv[2] || 8080;

var server = app.listen(port, function () {
		var host = server.address().address;
		var port = server.address().port;
		console.log('Processor listening at http://%s:%s', host, port);

});


app.get('/ner', function (req, res) {
		res.send('Server is running\n');
});

app.post('/ner', function(req, res) {
		var parsed = '';
		var nerPort = req.body.port ? req.body.port : 9191;
		var text = req.body.text.replace(/\n+/gm, function myFunc(x){return' ';});

		if (text.length){
			var process = spawn('java', ['-cp', 'stanford-ner/stanford-ner-with-classifier.jar', 'edu.stanford.nlp.ie.NERServer' ,'-port' ,nerPort ,'-client']);

			//when java server returns data
			process.stdout.on('data', function (data) {
					//ignore if 'Input' write file text to stream
					if(String(data).indexOf('Input some text and press RETURN to NER tag it,  or just RETURN to finish.')==0){
							process.stdin.write(text);
							process.stdin.write('\n');
							process.stdin.write('\n');
							return;
					}
					//concat returned data
					else if(String(data).length > 1){
							parsed += String(data);
							return;
					}
			});

			process.stdin.on('endData',function (data){
					console.log('endData: '+data, req.connection.remoteAddress);
			});

			process.stderr.on('data', function (data) {
			  console.log('stderr: ' + data, req.connection.remoteAddress);
			});

			//when process ends
			process.on('close', function (code) {
					console.log('stanford-ner process exited with code ' + code, req.connection.remoteAddress);
					//return ner tags, after parsing
					res.status(200).json({entities:parse(parsed)});
			});
		} else {
			console.log('Error: Empty text provided!', req.connection.remoteAddress);
			res.status(200).json({});
		}


});


var parse = function(parsed) {

		var tokenized   = parsed.split(/\s/gmi);
		var splitRegex  = new RegExp('(.+)/([A-Z]+)','g');

		var tagged              = _.map(tokenized, function(token) {
				var parts = new RegExp('(.+)/([A-Z]+)','g').exec(token);
				if (parts) {
						return {
								w:      parts[1],
								t:      parts[2]
						}
				}
				return null;
		});

		tagged = _.compact(tagged);

		// Now we extract the neighbors into one entity
		var entities = {};
		var i;
		var l = tagged.length;
		var prevEntity          = false;
		var entityBuffer        = [];
		for (i=0;i<l;i++) {
				if (tagged[i].t != 'O') {
						if (tagged[i].t != prevEntity) {
								// New tag!
								// Was there a buffer?
								if (entityBuffer.length>0) {
										// There was! We save the entity
										if (!entities.hasOwnProperty(prevEntity)) {
												entities[prevEntity] = [];
										}
                                        // Add to the entity list if unique
                                        if (!(entities[prevEntity].indexOf(entityBuffer.join(' ')) > -1)) {
                                            entities[prevEntity].push(entityBuffer.join(' '));
                                        }
										// Now we set the buffer
										entityBuffer = [];
								}
								// Push to the buffer
								entityBuffer.push(tagged[i].w);
						} else {
								// Prev entity is same a current one. We push to the buffer.
								entityBuffer.push(tagged[i].w);
						}
				} else {
						if (entityBuffer.length>0) {
								// There was! We save the entity
								if (!entities.hasOwnProperty(prevEntity)) {
										entities[prevEntity] = [];
								}
                                // Add to the entity list if unique
                                if (!(entities[prevEntity].indexOf(entityBuffer.join(' ')) > -1)) {
                                    entities[prevEntity].push(entityBuffer.join(' '));
                                }
								// Now we set the buffer
								entityBuffer = [];
						}
				}
				// Save the current entity
				prevEntity = tagged[i].t;
		}

		return entities;
};

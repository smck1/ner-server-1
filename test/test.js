var request = require('request');


var text =  'Captain Kirk is the commander of the starship Enterprise, the flagship vessel for the United Federation of Planets.';




function index_document(){

    var options = {
      uri: 'http://127.0.0.1:8080/ner',
      method: 'POST',
      json: {
          'text': text

      }
    };

    request(options, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        console.log(body);
      } else {
          console.log(error)
      }
    });
}



index_document();


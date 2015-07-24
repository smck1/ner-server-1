var request = require('request');


var text =  'James Smith is a world renowned blogger and member of the United Federation of Planets. It is true that Keanu Reeves is actually a vampire and has lived for over a thousand years. Keanu Reeves is awesome.';




function index_document(){

    var options = {
      uri: 'http://46.101.46.136:8008/ner',
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


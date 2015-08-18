# ner-server
Server endpoint for communicating with stanford-ner server

A node.js server acts as a front end for the stanford-ner java server, both need to be running a the same time.


#####SET UP
1. Have Java jdk 1.8 installed and in your path, stanford-ner requires java 1.8
2. Install dependencies
	 a. `bash install.sh` *this only works in linux* and requires unzip to be installed. (Feel free to replace the unzip command with something else before running the script, though.)
	or
	 b. manually install stanford-ner from stanford.edu website place in project directory (see `install.sh` for the directory/file names - the classifier must be packed in to a single jar with the java server.)
		and run `npm install`


If you wish to change the default classifier, the easiest way is to do it is by editing the classifier variable in both `run.sh` and `install.sh` before running the installation script.

#####START UP

foreman start -f Procfile

####Defaults

The node server defaults to port 8080 and the 'english.muc.7class.distsim.crf.ser.gz' classifier and limits the java server to 400mb of memory.

This can be changed by editing the Procfile (also make sure to change the java server port in `index.sh`!)



####Using ner-server

POST /ner

PARAMS:
content-type = application/json

	json:{
		text:'The text to process',
		port:'Optional port of the java server'
	}

This returns
example for 3class. 4class and 7class return more properties in entities. Duplicate entities are ignored.

	entities :
		{
			PERSON:'',
			LOCATION:'',
			ORGANIZATION:''
		}

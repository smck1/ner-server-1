# ner-server
Server endpoint for communicating with stanford-ner server

#####SET UP
1. Have Java jdk 1.8 installed and in your path, stanford-ner requires java 1.8
2. Install dependencies
	 a. `bash install.sh` *this only works in linux*
	or
	 b. manually install stanford-ner from stanford.edu website place in project directory (see `install.sh` for the directory/file names - the classifier must be packed in to a single jar with the java server.)
		and run `npm install`


If you wish to change the default classifier, the easiest way is to do it is by editing the classifier variable in both `run.sh` and `install.sh` before running the installation script.

#####START UP

Simply run the shell script `run.sh`. The ports for the java (used by the node server) and node servers can be changed by editing the variables in the script.

##Defaults

The node server defaults to port 8080 and the 'english.muc.7class.distsim.crf.ser.gz' classifier and limits the java server to 400mb of memory.

If you wish to change the classifier after running the install you need to recreate the stanford-ner-with-classifier.jar with the appropriate classifier (see the commands in `install.sh` and replace the classifier name), as well as editing the classifier in `run.sh`.

Changing ports and memory limitations simply requires modifying the respective variables in `run.sh`.



####Using ner-server

POST /ner

PARAMS:
content-type = application/json
 
	json:{
		text:'string of text from file',				
		port:'port number of stanford java server, optional and defaults to using port 9191 for stanford java server'
	}		
	
This returns
example for 3class. 4class and 7class return more properties in entities

	entities :
		{	
			PERSON:'',
			LOCATION:'',
			ORGANIZATION:''
		}



#start server script

javaport='9191'
nodeport='8080'
memory='400m'
classifier='english.muc.7class.distsim.crf.ser.gz'

nohup java -mx$memory -cp stanford-ner-with-classifier.jar edu.stanford.nlp.ie.NERServer -port 9191 -loadClassifier classifiers/$classifier &> ner.out &

nohup node node_modules/ner-server/index.js $nodeport &> server.out &

exit 0

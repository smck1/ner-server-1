# install.sh

url='http://nlp.stanford.edu/software/stanford-ner-2015-04-20.zip'
classifier='english.muc.7class.distsim.crf.ser.gz'

npm install
wget -O stanford-ner.zip $url
unzip stanford-ner.zip
rm stanford-ner.zip

cp stanford-ner/stanford-ner.jar stanford-ner/stanford-ner-with-classifier.jar

jar -uf stanford-ner/stanford-ner-with-classifier.jar stanford-ner/classifiers/$classifier

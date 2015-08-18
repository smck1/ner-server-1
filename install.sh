# install.sh

base_url='http://nlp.stanford.edu/software/'
version='stanford-ner-2015-04-20'
classifier='english.muc.7class.distsim.crf.ser.gz'

npm install
wget -O stanford-ner.zip $base_url$version.zip
unzip stanford-ner.zip
rm stanford-ner.zip
mv $version stanford-ner

cp stanford-ner/stanford-ner.jar stanford-ner/stanford-ner-with-classifier.jar

jar -uf stanford-ner/stanford-ner-with-classifier.jar stanford-ner/classifiers/$classifier

echo "Installation complete!"

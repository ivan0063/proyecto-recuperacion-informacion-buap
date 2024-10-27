var natural = require('natural');
var sw = require('stopword');

//Tokenizer
var tokenizer = new natural.WordTokenizer();
console.log("Tokens: ",tokenizer.tokenize("hi men"));

//Stemmers
console.log("stemmers-ingles: ",natural.PorterStemmer.stem("words and being lol"));
console.log("stemmers-español",natural.PorterStemmerEs.stem("jugaría"));

//if-idf
var TfIdf = natural.TfIdf;
var tfidf = new TfIdf();

tfidf.addDocument('1.-this docuemnt is about rubi');
tfidf.addDocument('2.-this docuemnt is about node is awesome');
tfidf.addDocument('3.-this docuemnt is about c++');
tfidf.addDocument('4.-this docuemnt is about java is awesome');

console.log('node ______________________________');
tfidf.tfidfs('awesome',function(i,measure){
	console.log('document #' + i + ' is ' + measure);
});

//remove stop words example
var oldString = 'a really interesting string with some words 123!'.split(' ');
var newString = sw.removeStopwords(oldString);

console.log("no step words: ", newString);


//lectura del archivo
var fs = require("fs");

var archivo = fs.readFileSync('./Corpus/cf74','utf8',(err,datos) =>{
	if(err)
		console.log(err);
});

//console.log(archivo);

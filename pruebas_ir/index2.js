var natural = require('natural');
var sw = require('stopword');
var fs = require('fs');


//leer texto
var texto1 = fs.readFileSync('./ejem.txt','utf8',(err,d)=>{
	if(err)
		console.log("Ocurrio un error :/ =",err);
});

var texto2 = fs.readFileSync('./ejem2.txt','utf8',(err,d)=>{
	if(err)
		console.log("Ocurrio un error :/ =",err);
});

var texto3 = fs.readFileSync('./ejem3.txt','utf8',(err,d)=>{
	if(err)
		console.log("Ocurrio un error :/ =",err);
});


//tokens
var tokenizer = new natural.WordTokenizer();
var txt1 = tokenizer.tokenize(texto1);
var txt2 = tokenizer.tokenize(texto2);
var txt3 = tokenizer.tokenize(texto3);


//quitar stopwords
var txt1 = sw.removeStopwords(txt1);
var txt2 = sw.removeStopwords(txt2);
var txt3 = sw.removeStopwords(txt3);


//steamer
for (var i = 0; i < txt1.length; i++)
	txt1[i] = natural.PorterStemmer.stem(txt1[i]);
for (var i = 0; i < txt2.length; i++)
	txt2[i] = natural.PorterStemmer.stem(txt2[i]);
for (var i = 0; i < txt3.length; i++)
	txt3[i] = natural.PorterStemmer.stem(txt3[i]);

console.log("texto1: ",txt1[5] + " " + txt1[8] + " " + txt1[30]);
console.log("texto2: ",txt2[5] + " " + txt2[8] + " " + txt2[30]);
console.log("texto3: ",txt3[5] + " " + txt3[8] + " " + txt3[30]);

//pesos tfidf
var TfIdf = natural.TfIdf;
var tfidf = new TfIdf();

tfidf.addDocument(txt1);
tfidf.addDocument(txt2);
tfidf.addDocument(txt3);


tfidf.tfidfs(' subject adult method ',function(i,measure){
	console.log('document #' + i + ' is ' + measure);
});


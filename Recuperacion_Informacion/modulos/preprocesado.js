var natural = require('natural'),
	stopwords = require('stopword');

var tokenizer = new natural.WordTokenizer();

function preProcesarTexto(texto){
	//separa en tokens
	texto = tokenizer.tokenize(texto);
	//quita palabras stop-words
	texto = stopwords.removeStopwords(texto);
	//steming de las palabras
	for (var i = 0; i < texto.length; i++)
		texto[i] = natural.PorterStemmer.stem(texto[i]);

	return texto;
}

module.exports.preProcesarTexto = preProcesarTexto;
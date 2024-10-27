var fs = require('fs'),
	TfIdf = require('./tfidf'),
	texto = require('./preprocesado');

//funcion para elimiar repetidos en arreglo
Array.prototype.unique=function(a){
  return function(){return this.filter(a)}}(function(a,b,c){return c.indexOf(a,b+1)<0
});

//Se obtienen los datos desde el archivo json
console.log("Cargando Corpus...");
var docs = fs.readFileSync('./Corpus/corpus.json');

//esto es lo que tiene cada doc: jsonFile[i].numDoc y jsonFile[i].doc
jsonFile = JSON.parse(docs);

//Se hace el preprocesado para cada documento en docs
for (var i = 0; i < jsonFile.length; i++) {
	jsonFile[i].doc = texto.preProcesarTexto(jsonFile[i].doc);
}
console.log("***************************Listo!");
console.log("Cargando Terminos Indice...");
//Se obtienen los terminos indice
var terminos_indice = [];

for (var i = 0; i < jsonFile.length; i++) {
	for (var j = 0; j < jsonFile[i].doc.length; j++)
		terminos_indice.push(jsonFile[i].doc[j])
}
terminos_indice = terminos_indice.unique();
console.log("***************************Listo!");

//se obtienen los pesos idf;
var idf = [];
for (var i = 0; i < terminos_indice.length; i++) {
	idf.push(TfIdf.calculaIDF(jsonFile,terminos_indice[i]))	
}

//Se obtienen los documentos y pesos tfidf
console.log("Cargando Documentos...");
var documentos = []

for (var i = 0; i < jsonFile.length; i++) {
	var temp = new Object();
	temp.num_doc = jsonFile[i].numDoc;
	temp.tfidf = [];

	for (var j = 0; j < terminos_indice.length; j++) {
		var tf = TfIdf.calculaTF(jsonFile[i].doc,terminos_indice[j]);
		temp.tfidf.push(tf*idf[j]);
	}
	documentos.push(temp);
}

console.log("***************************Listo!");

jsonFile = JSON.parse(docs);

module.exports.terminos_indice = terminos_indice;
module.exports.documentos = documentos;
module.exports.idf = idf;
module.exports.jsonFile = jsonFile;
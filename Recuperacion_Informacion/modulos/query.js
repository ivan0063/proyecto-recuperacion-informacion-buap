var datos = require('../modulos/obtener-datos'),
	TfIdf = require('./tfidf'),
	preprocesado = require('../modulos/preprocesado');

function preProcesarQuery(query){
	return preprocesado.preProcesarTexto(query);
}

function obtienePesosTfidfQuery(query){
	tfidf_q = [];

	for (var i = 0; i < datos.terminos_indice.length; i++) {
		var tf = TfIdf.calculaTF(query,datos.terminos_indice[i]);
		tfidf_q.push(tf * datos.idf[i]);
	}

	return tfidf_q;
}

module.exports.preProcesarQuery = preProcesarQuery;
module.exports.obtienePesosTfidfQuery = obtienePesosTfidfQuery;
var datos = require('../modulos/obtener-datos');

function rankProductoEscalar(query){
	var rank = [];
	var acomula = 0;

	for (var i = 0; i < datos.documentos.length; i++) {
		//datos.documentos[i].num_doc datos.documentos[i].tfidf
		var temp = new Object();
		temp.documento = datos.documentos[i].num_doc;
		temp.contenido = datos.jsonFile.find(function(e){
			return e.numDoc == temp.documento;
		}).doc;
		for (var j = 0; j < datos.documentos[i].tfidf.length; j++)
			acomula += datos.documentos[i].tfidf[j] * query[j];
		temp.rank = acomula;
		acomula = 0;
		rank.push(temp);
	}

	return rank.sort((a,b)=>{
		if(a.rank > b.rank)
			return -1;
		if(a.rank < b.rank)
			return 1;
		return 0;
	});
}

function rankSimCos(query){
	var rank = [],
		acomulaDiv = 0,
		acomulaDocs = 0,
		acomulaQuery = 0,
		resultado,infDiv;

	for (var i = 0; i < datos.documentos.length; i++) {
		//datos.documentos[i].num_doc datos.documentos[i].tfidf
		var temp = new Object();
		temp.documento = datos.documentos[i].num_doc;
		temp.contenido = datos.jsonFile.find(function(e){
			return e.numDoc == temp.documento;
		}).doc;
		temp.vector = datos.documentos[i].tfidf;

		for (var j = 0; j < datos.documentos[i].tfidf.length; j++){
			acomulaDiv += datos.documentos[i].tfidf[j] * query[j];
			acomulaDocs += Math.pow(datos.documentos[i].tfidf[j],2);
			acomulaQuery += Math.pow(query[j],2);
		}

		acomulaDocs = Math.sqrt(acomulaDocs);
		acomulaQuery = Math.sqrt(acomulaQuery);
		infDiv = acomulaDocs * acomulaQuery;

		resultado = acomulaDiv/infDiv; 

		temp.rank = resultado;
		acomulaDiv = 0;
		acomulaDocs = 0;
		acomulaQuery = 0;
		rank.push(temp);
	}

	return rank.sort((a,b)=>{
		if(a.rank > b.rank)
			return -1;
		if(a.rank < b.rank)
			return 1;
		return 0;
	});
}

function rankDimDice(query){
	var rank = [],
		acomulaDiv = 0,
		acomulaDocs = 0,
		acomulaQuery = 0,
		resultado,infDiv;

	for (var i = 0; i < datos.documentos.length; i++) {
		//datos.documentos[i].num_doc datos.documentos[i].tfidf
		var temp = new Object();
		temp.documento = datos.documentos[i].num_doc;
		temp.contenido = datos.jsonFile.find(function(e){
			return e.numDoc == temp.documento;
		}).doc;
		temp.vector = datos.documentos[i].tfidf;

		for (var j = 0; j < datos.documentos[i].tfidf.length; j++){
			acomulaDiv += datos.documentos[i].tfidf[j] * query[j];
			acomulaDocs += Math.pow(datos.documentos[i].tfidf[j],2);
			acomulaQuery += Math.pow(query[j],2);
		}

		acomulaDocs = Math.sqrt(acomulaDocs);
		acomulaQuery = Math.sqrt(acomulaQuery);
		infDiv = acomulaDocs + acomulaQuery;
		acomulaDiv *= 2;

		resultado = acomulaDiv/infDiv; 

		temp.rank = resultado;
		acomulaDiv = 0;
		acomulaDocs = 0;
		acomulaQuery = 0;
		rank.push(temp);
	}

	return rank.sort((a,b)=>{
		if(a.rank > b.rank)
			return -1;
		if(a.rank < b.rank)
			return 1;
		return 0;
	});
}

function rankJacc(query){
	var rank = [],
		acomulaDiv = 0,
		acomulaDocs = 0,
		acomulaQuery = 0,
		resultado,infDiv;

	for (var i = 0; i < datos.documentos.length; i++) {
		//datos.documentos[i].num_doc datos.documentos[i].tfidf
		var temp = new Object();
		temp.documento = datos.documentos[i].num_doc;
		temp.contenido = datos.jsonFile.find(function(e){
			return e.numDoc == temp.documento;
		}).doc;
		temp.vector = datos.documentos[i].tfidf;

		for (var j = 0; j < datos.documentos[i].tfidf.length; j++){
			acomulaDiv += datos.documentos[i].tfidf[j] * query[j];
			acomulaDocs += Math.pow(datos.documentos[i].tfidf[j],2);
			acomulaQuery += Math.pow(query[j],2);
		}

		infDiv = acomulaDocs + acomulaQuery - acomulaDiv;

		resultado = acomulaDiv/infDiv; 

		temp.rank = resultado;
		acomulaDiv = 0;
		acomulaDocs = 0;
		acomulaQuery = 0;
		rank.push(temp);
	}

	return rank.sort((a,b)=>{
		if(a.rank > b.rank)
			return -1;
		if(a.rank < b.rank)
			return 1;
		return 0;
	});
}

module.exports.rankProductoEscalar = rankProductoEscalar;
module.exports.rankSimCos = rankSimCos;
module.exports.rankDimDice = rankDimDice;
module.exports.rankJacc = rankJacc;
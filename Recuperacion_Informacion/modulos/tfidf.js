
function calculaTF(doc,termino){
	var tf = 0;//numero de veces que aparece el termino en el docuemnto

	for (var i = 0; i < doc.length; i++) {
		if(doc[i] == termino)
			tf++;
	}

	return tf;
}

function calculaIDF(coleccion,termino){
	var df = 0; //numero de veces que aparece el termino en los docuemntos
	for (var i = 0; i < coleccion.length; i++) {
		for (var j = 0; j < coleccion[i].doc.length; j++) {
			if(coleccion[i].doc[j] == termino){
				df++;
				break;
			}
		}
	}

	return (Math.log10(coleccion.length/df)) + 1;
}

module.exports.calculaTF = calculaTF;
module.exports.calculaIDF = calculaIDF;
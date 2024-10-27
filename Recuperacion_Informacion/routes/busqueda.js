var express = require('express'),
	query_f = require('../modulos/query'),
	rankf = require('../modulos/funciones_rank'),
	router = express.Router();

router.get('/',function(req,res){
	var init_time = new Date(); //se comienza a medir el tiempo

	var query = query_f.preProcesarQuery(req.query.buscar); //preprocesa la consulta
		query = query_f.obtienePesosTfidfQuery(query); //retorna un arreglo de pesos TF-IDF

	var resultado;
	
	if(req.query.funcion_rank == 'producto_escalar')
		resultado = rankf.rankProductoEscalar(query);
	else if(req.query.funcion_rank == 'simCos')
		resultado = rankf.rankSimCos(query);
	else if(req.query.funcion_rank == 'simDice')
		resultado = rankf.rankDimDice(query);
	else if(req.query.funcion_rank == 'simJacc')
		resultado = rankf.rankJacc(query);

	var cont_resultados = 0;
	for (var i = 0; i < resultado.length; i++) {
		if(resultado[i].rank > 0)
			cont_resultados++;
	}

	var fin_time = new Date(); //fin de tiempo

	res.render('busqueda',{
		titulo: "Voy a tener suerte!", 
		resultado: resultado, 
		query: req.query.buscar,
		res_totales: cont_resultados,
		total_time: (fin_time-init_time)
	});
});

module.exports = router;
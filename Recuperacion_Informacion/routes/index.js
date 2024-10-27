var express = require('express'),
	data = require('../modulos/obtener-datos'),
	router = express.Router();

router.get('/',function(req,res){

	res.render('index',{
		titulo: "Pruebas!", 
		corpus_length: data.documentos.length,
		terminos: data.terminos_indice
	});

});

module.exports = router;
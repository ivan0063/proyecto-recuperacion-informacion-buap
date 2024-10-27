var express = require('express'),
	bodyParser = require('body-parser'),
	path = require('path');

var app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.set('views',path.join(__dirname, './views'));
app.set('view engine','pug');
app.use(express.static(path.join(__dirname, './public')));

app.use('/',require('./routes/index'));
app.use('/busqueda',require('./routes/busqueda'))

app.listen(4000,function(){
	console.log("Escuchando en puerto 4000");
});
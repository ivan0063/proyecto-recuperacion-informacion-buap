var fs = require('fs');

var corpus = fs.readFileSync('./copus')
			.toString()
			.split('\n');

var archivo_final = "[\n";

console.log(corpus.length);
var i = 0;
while(i < corpus.length){
	archivo_final += '{' + '"numDoc":"' + corpus[i] + '","doc":"' + corpus[i+1] + '"},\n';
	//console.log(archivo_final);
	i = i + 3;
}

archivo_final += "]";
fs.writeFileSync('corpus.json',archivo_final,'utf8');
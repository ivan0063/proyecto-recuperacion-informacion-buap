var fs = require('fs');
var natural = require('natural');

var corpus = fs.readFileSync('../corpus/cf77','utf8');
var tokenizer = new natural.WordTokenizer();

var texto = tokenizer.tokenize(corpus);

var obj;
var arr = [];
var i = 0;
var str;
var band = false;

arr.push(obj);
while(i < texto.length){
	if(texto[i] == 'RN'){
		obj = new Object();
		obj.numDoc = texto[i + 1];
		console.log("Tengo el doc " + texto[i + 1]);
		band = true;
	}

	if((texto[i] == "AB" || texto[i] == "EX") && band){
		str = "";
		i++;
		while(texto[i] != "PN" && texto[i] != "RN" && texto[i] != "AN" && texto[i] != "AU" && texto[i] != "TI" && texto[i] != "SO" && texto[i] != "MJ" && texto[i] != "MN" && texto[i] != "RF" && texto[i] != "CT"){
			str += texto[i] + " ";
			i++;
		}
		console.log("Y ahora su texto******************")
		obj.doc = str;
		arr.push(obj);
		band = false;
	}else
		i++;
}

//fs.writeFileSync('data.json', JSON.stringify(arr, null, 2) , 'utf-8');
fs.appendFile('../modulos/data.json', JSON.stringify(arr, null, 2) , 'utf-8');

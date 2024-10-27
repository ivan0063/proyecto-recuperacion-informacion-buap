var natural = require('natural');
var sw = require('stopword');
var fs = require('fs');

var tokenizer = new natural.WordTokenizer();

alldocCF73 = fs.readFileSync('./Corpus/cf77','utf8');
var arr_CF73 = tokenizer.tokenize(alldocCF73);

var texto = "";
var bol = false;

for (var i = 0; i < arr_CF73.length; i++) {
	if (arr_CF73[i] == 'PN'){
		texto += arr_CF73[i+1] + '\n';
		bol = true
	}

	if(arr_CF73[i] == 'AB' || arr_CF73[i] == 'EX' && bol){
		j = i + 1;
		while(arr_CF73[j] != 'RF'){
			texto += arr_CF73[j] + ' ';
			j++;
		}
		texto += '\n\n'
		i = j;
		bol = false;
	}
}

fs.appendFileSync('./copus',texto,'utf8');
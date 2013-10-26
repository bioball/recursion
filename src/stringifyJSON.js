// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to have to write it from scratch:

//helper function
var stringifyJSON = function(obj){
	var findType = function(element){
		return Object.prototype.toString.apply(element);
	}
	var type = findType(obj);
	switch(type)
	{
	case '[object Array]':
		var collection = []
		for(var i = 0; i < obj.length; i++){
			collection.push(stringifyJSON(obj[i]));
		}
		return '[' + collection.join(',') + ']';
	case '[object Object]':
		var collection = []
		for (var k in obj){
			var kType = findType(obj[k]);
			if (kType !== '[object Function]' && kType !== '[object Undefined]'){
				collection.push("\"" + k + "\":" + stringifyJSON(obj[k]));
			}
		}
		return '{' + collection.join(',') + '}';
	case '[object String]':
		return '"' + obj + '"';
	case '[object Function]':
		return '';
	case '[object Undefined]':
		return '';
	default:
		return String(obj);
	}
};
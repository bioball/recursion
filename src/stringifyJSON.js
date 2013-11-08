// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to have to write it from scratch:

//helper function
var stringifyJSON = function(obj){
  var 
    findType = function(element){ return Object.prototype.toString.apply(element) },
    type     = findType(obj);

  switch(type)
  {
  case '[object Array]':
    var collection = []
    _(obj).each(function(element){
      collection.push(stringifyJSON(element));
    })
    return '[' + collection.join(',') + ']';
  case '[object Object]':
    var collection = []
    _(obj).each(function(element, key){
      var keyType = findType(element);
      if (keyType !== '[object Function]' && keyType !== '[object Undefined]'){
        collection.push('"' + key + '":' + stringifyJSON(element));
      }
    })
    return '{' + collection.join(',') + '}';
  case '[object String]':
    return '"' + obj + '"';
  default:
    return String(obj);
  }
};
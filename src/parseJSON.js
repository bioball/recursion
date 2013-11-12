// this is what you would do if you were one to do things the easy way:
// var parseJSON = JSON.parse;

// but you're not, so you'll write it from scratch:
var parseJSON = function (json) {
  var firstChar = charType(json[0]);
  switch(firstChar)
  {
  case "Array":
    return _(json.slice(1, json.length - 1).split(',')).map(function(element){
      return parseJSON(element);
    });
  case "Number":
    return parseInt(json, 10);
  case "Object":
    var results = {};
    json = json.replace(/\s+/g, '');
    _(json.slice(1, json.length - 1).split(',')).each(function(element){
      var index = element.indexOf(':');
      if(index > -1)
        results[parseJSON(element.substr(0, index))] = parseJSON(element.substr(index + 1, element.length));
    });
    return results;
  case "String":
    return json.slice(1, json.length-1);
  }
};

var charType = function(character){
  if(character === "[")
    return "Array";
  if(parseInt(character, 10))
    return "Number";
  if(character === "{")
    return "Object";
  if(character === '"')
    return "String";
};
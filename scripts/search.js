var url = "http://api.datausa.io/api/?show=geo&sumlevel=state&required=avg_wage";

d3.json(url, function(json) {

  var data = json.data.map(function(data){
    return json.headers.reduce(function(obj, header, i){
      obj[header] = data[i];
      return obj;
    }, {});
  });

});

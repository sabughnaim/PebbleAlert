Pebble.addEventListener('ready', function() {
  //console.log("Pebble JS is ready!");
  call(7733700051,"Calling for help");
});

var call = function(number,message) {
  console.log("Calling");
  var http=new XMLHttpRequest();
  var url="http://hackathonapi.inin.com/api/445006/call/callandplaytts";
  var data = {"number":number, "message":message};
	http.open("POST", url, true);
	http.setRequestHeader("Content-type", "application/json");
  http.setRequestHeader("Api-Key", "9ba5a9d0c20d82ea310ef53112");
  http.send(JSON.stringify(data));
};
Pebble.addEventListener('ready', function() {
  console.log("Pebble JS is ready!");
  
  Pebble.showSimpleNotificationOnPebble("help", "Send help");
  navigator.geolocation.getCurrentPosition(locationSuccess, locationError, locationOptions);
 
  
});

var latitude = 0;
var longitude = 0;
var street1="";
var street2="";
var placename="";
var msg = "I   am   in   danger,   please   send   help   at   ";

var call = function(number,message) {
  console.log("calling "+message);
  var http=new XMLHttpRequest();
  var url="http://hackathonapi.inin.com/api/445006/call/callandplaytts";
  var data = {"number":number, "message":message};
	http.open("POST", url, true);
	http.setRequestHeader("Content-type", "application/json");
  http.setRequestHeader("Api-Key", "9ba5a9d0c20d82ea310ef53112");
  http.send(JSON.stringify(data));
};

var locationOptions = {
  enableHighAccuracy: true, 
  maximumAge: 10000, 
  timeout: 10000
};

function locationSuccess(pos) {
  //this gets called!
  console.log('lat= ' + pos.coords.latitude + ' lon= ' + pos.coords.longitude);
  latitude = pos.coords.latitude;
  longitude = pos.coords.longitude;
  console.log(latitude);
  console.log(longitude);
  findIntersect(latitude,longitude);
}

function locationError(err) {
  console.log('location error (' + err.code + '): ' + err.message);
  //this only gets called in errors
}

var findIntersect = function(lat, lon) {
  var req = new XMLHttpRequest();
  var url="http://api.geonames.org/findNearestIntersectionJSON?lat="+lat+"&lng="+lon+"&username=pebblealert";
  console.log(url);
  req.open("GET", url, false);
  req.send();
  var myArr = JSON.parse(req.responseText);
  //console.log(myArr.intersection.placename);
  //console.log(typeof myArr);
  
  //console.log(myArr.intersection.street1);
  //console.log(myArr.intersection.street2);
  //console.log(myArr.intersection.placename);
  msg=msg+"   "+myArr.intersection.street1+"   and   "+myArr.intersection.street2+"   in   "+myArr.intersection.placename;
  console.log(msg);
  call(7733700051,msg);
  //console.log("send"+req.send());
};
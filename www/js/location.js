var watchID=null;

// functie word niet gebruikt => was om te testen hoe snel er werd gegaan en hoe nauwkeurig de locatie werd bepaald
function tracker(){
    console.log('in');
   function onSuccess(position) {
    var lat  = position.coords.latitude;
        lat  = lat.toFixed(6);
    var long = position.coords.longitude;
        long = long.toFixed(6);
    var date = new Date(position.timestamp);

    // Hours part from the timestamp
    var day = date.getDay();
    // Hours part from the timestamp
    var month = date.getMonth();
    // Hours part from the timestamp
    var hours = date.getHours();
    // Minutes part from the timestamp
    var minutes = "0" + date.getMinutes();
    // Seconds part from the timestamp
    var seconds = "0" + date.getSeconds();
    var time = day + '-' + month + ' ' + hours + '-' + minutes.substr(-2) + '-' + seconds.substr(-2);
    writeFile(lat, long, time);



   }

   // onError Callback receives a PositionError object
   //
   function onError(error) {
       alert('code: '    + error.code    + '\n' +
             'message: ' + error.message + '\n');
   }

   // Options: throw an error if no update is received every 30 seconds.
   //
   watchID = navigator.geolocation.watchPosition(onSuccess, onError, { timeout: 30000,enableHighAccuracy: true, maximumAge: 10*1000 });
}


function stopTracker(){
    navigator.geolocation.clearWatch(watchID);
}

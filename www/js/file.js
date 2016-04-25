var previous = '';
function writeFile(lat, long, time) {
    console.log('in write');
    var type = window.TEMPORARY;
  var size = 5*1024*1024;

  window.requestFileSystem(type, size, successCallback, errorCallback)

  function successCallback(fs) {
      console.log('1 succes');



     fs.root.getFile('log.txt', {create: true}, function(fileEntry) {

        fileEntry.createWriter(function(fileWriter) {

           fileWriter.onwriteend = function(e) {
            //   alert('Write completed.');
           };

           fileWriter.onerror = function(e) {
              alert('Write failed: ' + e.toString());
           };

           console.log('succes');
           var input = previous +lat+':'+long +':'+ time + '\n';
           var blob = new Blob([input], {type: 'text/plain'});
           previous = input;
           console.log(previous);
           fileWriter.write(blob);
        }, errorCallback);

     }, errorCallback);

  }

  function errorCallback(error) {
     alert("ERROR: " + error.code)
  }
}

function readFile() {
   var type = window.TEMPORARY;
   var size = 5*1024*1024;

   window.requestFileSystem(type, size, successCallback, errorCallback)

   function successCallback(fs) {

      fs.root.getFile('log.txt', {}, function(fileEntry) {

         fileEntry.file(function(file) {
            var reader = new FileReader();

            reader.onloadend = function(e) {
               var txtArea = document.getElementById('textarea');
               txtArea.value = this.result;
               previous = this.result;
            };

            reader.readAsText(file);

         }, errorCallback);

      }, errorCallback);
   }

   function errorCallback(error) {
      alert("ERROR: " + error.code)
   }

}

function removeFile(lat, long, time) {
    console.log('in remove');
    var type = window.TEMPORARY;
    var size = 5*1024*1024;

  window.requestFileSystem(type, size, successCallback, errorCallback)

  function successCallback(fs) {
    fs.root.getFile('log.txt', {create: true}, function(fileEntry) {

        fileEntry.createWriter(function(fileWriter) {

           fileWriter.onwriteend = function(e) {
            //   alert('Write completed.');
           };

           fileWriter.onerror = function(e) {
              alert('Write failed: ' + e.toString());
           };

            var blob = new Blob([''], {type: 'text/plain'});
           fileWriter.write(blob);
        }, errorCallback);

     }, errorCallback);

  }

  function errorCallback(error) {
     alert("ERROR: " + error.code)
  }
}






function sendFile(){

    var text = '';
    var type = window.TEMPORARY;
    var size = 5*1024*1024;

    window.requestFileSystem(type, size, successCallback, errorCallback)

    function successCallback(fs) {

       fs.root.getFile('log.txt', {}, function(fileEntry) {

          fileEntry.file(function(file) {
             var reader = new FileReader();

             reader.onloadend = function(e) {
                text = this.result.split('\n');
                // console.log(text);
                $.each(text, function( key, value ) {
                //   console.log( key + ": " + value );
                  var data = value.split(':');
                  console.log(data[0]);
                  var url = "https://mzd-jonasvr.c9users.io/tag/"+data[0]+"/"+data[1]+"/"+data[2];
                  console.log(url);
                  $.ajax({ //gegevens gaan ophalen
                      type:'GET',
                      url: url,
                      success:function(data){
                          console.log(data);
                      }});
                });
             };

             reader.readAsText(file);

          }, errorCallback);

       }, errorCallback);
    }

    function errorCallback(error) {
       alert("ERROR: " + error.code)
    }


}

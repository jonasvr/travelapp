function writeFile() {
    var type = window.TEMPORARY;
  var size = 5*1024*1024;

  window.requestFileSystem(type, size, successCallback, errorCallback)

  function successCallback(fs) {

      var previous = null;

      fs.root.getFile('log.txt', {}, function(fileEntry) {

         fileEntry.file(function(file) {
            var reader = new FileReader();

            reader.onloadend = function(e) {
              previous = this.result;
            };

            reader.readAsText(file);

         }, errorCallback);

      }, errorCallback);


     fs.root.getFile('log.txt', {create: true}, function(fileEntry) {

        fileEntry.createWriter(function(fileWriter) {

           fileWriter.onwriteend = function(e) {
              alert('Write completed.');
           };

           fileWriter.onerror = function(e) {
              alert('Write failed: ' + e.toString());
           };

           var blob = new Blob([previous + ' Lorem Ipsum'], {type: 'text/plain'});
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
            };

            reader.readAsText(file);

         }, errorCallback);

      }, errorCallback);
   }

   function errorCallback(error) {
      alert("ERROR: " + error.code)
   }

}

function removeFile() {
    fs.root.getFile('log.txt', {create: true}, function(fileEntry) {

       fileEntry.createWriter(function(fileWriter) {

          fileWriter.onwriteend = function(e) {
             alert('Write completed.');
          };

          fileWriter.onerror = function(e) {
             alert('Write failed: ' + e.toString());
          };

          var blob = new Blob([''], {type: 'text/plain'});
          fileWriter.write(blob);
       }, errorCallback);

    }, errorCallback);

}

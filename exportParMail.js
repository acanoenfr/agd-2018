document.addEventListener("ondeviceready", onDeviceReady, false)
    cordova.plugins.email.isAvailable(function(){

    window.resolveLocalFileSystemURL(cordova.file.externalApplicationStorageDirectory, function (dir) {
        console.log('file system open: ' + dir);
        dir.getFile("/Download/myfile.csv", {
            create: true
        }, function (file) {
      //Send the mail
      cordova.plugins.email.open({
        to:         'alienfang15@gmail.com', // email addresses for TO field
        attachments: Array, // file paths or base64 data streams
        subject:    "test email", // subject of the email
    }, callback, scope);// end emailOpen
        });//end getFile
    });//end resolveLocal
    });//end isAvailable

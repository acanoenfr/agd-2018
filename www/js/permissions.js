document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
	var permissions = cordova.plugins.permissions;
	permissions.checkPermission(permissions.WRITE_EXTERNAL_STORAGE, function( status ){
		if ( status.hasPermission ) {
			console.log("ok");
		} else {
			permissions.requestPermission(permissions.WRITE_EXTERNAL_STORAGE, success, error);
			function error() {
				console.warn('No storage permission');
			}
			function success( status ) {
				if( !status.hasPermission ) error();
			}
		}
	});
}
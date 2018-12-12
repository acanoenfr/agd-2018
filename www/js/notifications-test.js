document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
	// Fonction servant au déploiement de notifications
    cordova.plugins.notification.local.schedule([
        { id: 0, title: 'Bonjour', text: 'Je suis un test', foreground: true }, // Notification qui s'envoie au lancement de l'appli
        { id: 1, title: '10sec', text: 'Salut', trigger: { in : 10, unit: 'second' } } // Notification qui s'envoie 10sec après le lancement de l'appli
    ]);
}
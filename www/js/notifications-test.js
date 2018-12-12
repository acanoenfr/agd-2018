document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
	// Fonction servant au déploiement de notifications
    cordova.plugins.notification.local.schedule([
        { id: 0, // Notification qui s'envoie au lancement de l'appli
        	title: 'Devoirs à rendre', // Titre
        	text: 'Pour les TP1A', // Description
        	foreground: true,
        	vibrate: true }, // La notification fera vibrer le téléphone (car true)
        { id: 1, // Notification qui s'envoie 10sec après le lancement de l'appli
        	title: "Réunion d'informations",
        	text: 'De 10h à 11h',
        	trigger: { in : 10, unit: 'second' }, // S'envoie dans 10 secondes
        										/* Il est également possible de l'envoyer à une date précise avec: 	*/
        										/* trigger: { at: new Date(2017, 10, 27, 15, 30) }	*	*	*	*	*/
        										/* Format année, mois, jour, heure, minute			*	*	*	*	*/
        	vibrate: true }
    ]);
}
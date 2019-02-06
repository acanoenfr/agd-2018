// Fonction vérifiant le contenu du titre de l'événement après avoir appuyé sur une touche
$("#ipTitle").keyup(function() {
	// Si il y a quelque chose dedans
	if ($(this).val()) {
		$(this).css("borderColor", ""); // Couleur de bordure par défaut
		$(this).css("borderWidth", ""); // Taille de bordure par défaut
		$(this).parent().find(".md-form-label").css("color", ""); // Label en couleur par défaut
		$(this).parent().find(".md-form-helper").css("color", ""); // Couleur du helper text par défaut
	} else { // Sinon
		$(this).css("borderColor", "#B00020"); // Couleur de bordure rouge
		$(this).css("borderWidth", "2px"); // Taille de bordure à 2px (au lieu de 1px par défaut)
		$(this).parent().find(".md-form-label").css("color", "#B00020"); // Label en rouge
		$(this).parent().find(".md-form-helper").css("color", "#B00020"); // Couleur du helper text rouge
	}
});

$("#ipDebut").keyup(function() {
    if ($(this).val()) {
        $(this).css("borderColor", ""); // Couleur de bordure par défaut
        $(this).css("borderWidth", ""); // Taille de bordure par défaut
        $(this).parent().find(".md-form-label").css("color", ""); // Label en couleur par défaut
        $(this).parent().find(".md-form-helper").css("color", ""); // Couleur du helper text par défaut
    } else { // Sinon
        $(this).css("borderColor", "#B00020"); // Couleur de bordure rouge
        $(this).css("borderWidth", "2px"); // Taille de bordure à 2px (au lieu de 1px par défaut)
        $(this).parent().find(".md-form-label").css("color", "#B00020"); // Label en rouge
        $(this).parent().find(".md-form-helper").css("color", "#B00020"); // Couleur du helper text rouge
    }
});

function subDays(dt, n) {
	return (new Date(dt.setDate(dt.getDate() - n))).toString()
}

// Ouverture de la base de données
let myDB = window.openDatabase("Events00000000", "1.0", "All Deadlines", 2000000);

// Fonction récupérant le texte entré et l'envoyant à la bdd, exécuté au clic du bouton (+)
$(".btn-submit").click(function() {
    // Récup. du titre
    let titre = document.getElementById("ipTitle").value;
    
    // Récup. de la date de début 
    let debut = document.getElementById("ipDebut").value;
   
    // Idem pour la date de fin
    let end = document.getElementById("ipEnd").value;
    
    // Récup. de la description de la deadline
    let desc = document.getElementById("ipDesc").value;

	if (titre =="" || debut =="") {
		if (titre == "") {
			$("#ipTitle").css("borderColor", "#B00020");
			$("#ipTitle").css("borderWidth", "2px");
			$("#ipTitle").parent().find(".md-form-label").css("color", "#B00020");
			$("#ipTitle").parent().find(".md-form-helper").css("color", "#B00020");
		}
		if (debut == "") {
			$("#ipDebut").css("borderColor", "#B00020");
			$("#ipDebut").css("borderWidth", "2px");
			$("#ipDebut").parent().find(".md-form-label").css("color", "#B00020");
			$("#ipDebut").parent().find(".md-form-helper").css("color", "#B00020");	
		}
	} else {
	
	    // Transaction SQL
	    myDB.transaction(function (txn) {
	        // Insère les données entrées dans la table events
	        txn.executeSql(`INSERT INTO events(title, content, start, end) VALUES(?, ?, ?, ?)`, [ titre, desc, debut, end ], function (tx, res) {
	            // Si ça marche => on indique dans la console dev que ça marche
				console.info('Insert data in events');
	        }, function (tx, err) {
	            // Si y'a un pb => message d'erreur dans la console
	            console.warn('Err[' + err.code + ']: ' + err.message);
	        })
	    })
		
		window.location='home.html';
   	}
});
function checkTitre() {
	let elm = document.getElementById("ipTitle");
	if (elm.value != "") {
		elm.style.backgroundColor = "#fff";
	} else {
		elm.style.backgroundColor = "#fcc2c2";
	}
}

function checkDate() {
	let elm = document.getElementById("ipDebut");
	if (elm.value != "") {
		elm.style.backgroundColor = "#fff";
	} else {
		elm.style.backgroundColor = "#fcc2c2";
	}
}

// Ouverture de la base de données
let myDB = window.openDatabase("Events00000000", "1.0", "All Deadlines", 2000000);

// Fonction récupérant le texte entré et l'envoyant à la bdd, exécuté au clic du bouton (+)
function recupText(){
    // Récup. du titre
    let titre = document.getElementById("ipTitle").value;
    
    // Récup. de la date de début 
    let debut = document.getElementById("ipDebut").value;
   
    // Idem pour la date de fin
    let end = document.getElementById("ipEnd").value;
    
    // Récup. de la description de la deadline
    let desc = document.getElementById("ipDesc").value;

	if (titre =="" || debut ==""){
		return false;
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
}
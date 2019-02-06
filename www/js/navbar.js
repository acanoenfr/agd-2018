var accueilbtn = $("#nav-accueil");
var historiquebtn = $("#nav-historique");
var exporterbtn = $("#nav-exporter");

accueilbtn.click(function() {
	$("#nav-historique span").text("");
	historiquebtn.removeClass("current");

	$("#nav-exporter span").text("");
	exporterbtn.removeClass("current");

	$("#nav-accueil span").text("Accueil");
	accueilbtn.addClass("current");
});

historiquebtn.click(function() {
	$("#nav-accueil span").text("");
	accueilbtn.removeClass("current");

	$("#nav-exporter span").text("");
	exporterbtn.removeClass("current");

	$("#nav-historique span").text("Historique");
	historiquebtn.addClass("current");

	window.location = "Historique.html";
});

exporterbtn.click(function() {
	$("#nav-accueil span").text("");
	accueilbtn.removeClass("current");

	$("#nav-historique span").text("");
	historiquebtn.removeClass("current");

	$("#nav-exporter span").text("Exporter");
	exporterbtn.addClass("current");
});
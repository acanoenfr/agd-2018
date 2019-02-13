var accueilbtn = $("#nav-accueil");
var historiquebtn = $("#nav-historique");
var exporterbtn = $("#nav-exporter");

accueilbtn.click(function() {
	historiquebtn.removeClass("current");
	if($("#nav-historique svg").hasClass("svg-up"))
		$("#nav-historique svg").addClass("svg-down");
	$("#nav-historique svg").removeClass("svg-up");

	exporterbtn.removeClass("current");
	if($("#nav-exporter svg").hasClass("svg-up"))
		$("#nav-exporter svg").addClass("svg-down");
	$("#nav-exporter svg").removeClass("svg-up");

	accueilbtn.addClass("current");
	$("#nav-accueil svg").removeClass("svg-down");
	$("#nav-accueil svg").addClass("svg-up");
});

historiquebtn.click(function() {
	accueilbtn.removeClass("current");
	if($("#nav-accueil svg").hasClass("svg-up"))
		$("#nav-accueil svg").addClass("svg-down");
	$("#nav-accueil svg").removeClass("svg-up");

	exporterbtn.removeClass("current");
	if($("#nav-exporter svg").hasClass("svg-up"))
		$("#nav-exporter svg").addClass("svg-down");
	$("#nav-exporter svg").removeClass("svg-up");

	historiquebtn.addClass("current");
	$("#nav-historique svg").removeClass("svg-down");
	$("#nav-historique svg").addClass("svg-up");

	window.location = "Historique.html";
});

exporterbtn.click(function() {
	accueilbtn.removeClass("current");
	if($("#nav-accueil svg").hasClass("svg-up"))
		$("#nav-accueil svg").addClass("svg-down");
	$("#nav-accueil svg").removeClass("svg-up");

	historiquebtn.removeClass("current");
	if($("#nav-historique svg").hasClass("svg-up"))
		$("#nav-historique svg").addClass("svg-down");
	$("#nav-accueil svg").removeClass("svg-up");

	exporterbtn.addClass("current");
	$("#nav-exporter svg").removeClass("svg-down");
	$("#nav-exporter svg").addClass("svg-up");
});
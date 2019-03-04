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

function remplirChampsaModifier(dateGet) {
    dateGet = dateGet.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + dateGet + "=([^&#]*)"),
        results = regex.exec(location.search);
    let date = results[1];
    let db = window.openDatabase("Events00000000", "1.0", "All Deadlines", 2000000);
    db.transaction(function (tz) {
        tz.executeSql("select * from events", [], function (tz, resultado) {
            console.log(resultado)
        });
        if (id) {
            tz.executeSql("select * from events where start=? and id=?", [date, id], function (tz, resul) {
                var dateStart = (resul.rows[0].start);
                console.log(dateStart);
                var dateEnd = (resul.rows[0].end);
                console.log(dateEnd);
                $("#ipStart").val(dateStart);
                $("#ipEnd").val(dateEnd);
                $("#ipTitle").val(resul.rows[0].title);
                $("#ipDesc").val(resul.rows[0].content);
                $("#ipId").val(resul.rows[0].id);
            });
        } else {
            tz.executeSql("select * from events where start=?", [date], function (tz, resul) {
                var dateStart = (resul.rows[0].start);
                console.log(dateStart);
                var dateEnd = (resul.rows[0].end);
                console.log(dateEnd);
                $("#ipStart").val(dateStart);
                $("#ipEnd").val(dateEnd);
                $("#ipTitle").val(resul.rows[0].title);
                $("#ipDesc").val(resul.rows[0].content);
                $("#ipId").val(resul.rows[0].id);
            });
        }
    }, function (error) {
        console.log(error);
    },
    function () {
    });
}

function formatDate(date) {
    var dateN;
    console.log(date.length);
    if (date.length == 9) {
        if ((date.lastIndexOf("-")) - (date.indexOf("-")) < 3) {
            dateN = date.substr(0, 5).concat("0", date.substr(5, 8));
        }
        else {
            dateN = date.substr(0, 8).concat("0", date.substr(8, 8));
        }
    }
    if (date.length == 8) {
        var an = date.substr(0, 5);
        var mois = "0".concat(date.substr(5, 2));
        var jour = "0".concat(date.substr(7, 8));
        dateN = an.concat(mois, jour);
    }
    if(date.length==10){
        dateN=date;
    }
    return dateN;
}

function supprimerDeadline() {
    var c = confirm("Êtes-vous sûr de supprimer le Deadline? ");
    if (c) {
        var ipId = $("#ipId").val();
        let db = window.openDatabase("Events00000000", "1.0", "All Deadlines", 2000000);
        db.transaction(function (tx) {
            tx.executeSql('delete from events where id=?', [ipId], function (tx) {
                console.log('Deadline supprimé');
                window.location="home.html";
            });
        }, function (error) {
            console.log('Transaction ERROR: ' + error.message);
        }, function () {
        });
    }
}

function modifierDeadline() {
    let ipId = $("#ipId").val();
    let ipTitle = $("#ipTitle").val();
    let dateStart = $("#ipStart").val();            
    let dateEnd = $("#ipEnd").val();
    let ipContent = $("#ipDesc").val();
    if (ipTitle == "" || ipTitle == null || dateStart == null) {
        if (ipTitle == "" || ipTitle == null) {
            $("#ipTitle").css("borderColor", "#B00020");
            $("#ipTitle").css("borderWidth", "2px");
            $("#ipTitle").parent().find(".md-form-label").css("color", "#B00020");
            $("#ipTitle").parent().find(".md-form-helper").css("color", "#B00020");
        }
        if (dateStart = null) {
            $("#ipDebut").css("borderColor", "#B00020");
            $("#ipDebut").css("borderWidth", "2px");
            $("#ipDebut").parent().find(".md-form-label").css("color", "#B00020");
            $("#ipDebut").parent().find(".md-form-helper").css("color", "#B00020"); 
        }
    } else {
        var c = confirm("Êtes-vous sûr de modifier le Deadline? ");
        if (c) {
            let db = window.openDatabase("Events00000000", "1.0", "All Deadlines", 2000000)
            db.transaction(function (tw) {
                tw.executeSql('update events set title=?, content=?, start=?, end=? where id=?', [ipTitle, ipContent, dateStart, dateEnd, ipId], function (tw, r) {
                    window.location="home.html";
                    console.log(r.rowsAffected);
                });
            }, function (error) {
                console.log(error);
            }, function () {
            });
            db.transaction(function (trans) {
                trans.executeSql('Select * from events', [], function (trans, resu) {
                    console.log(resu.rows);
                });
            },
            function (error) {
                console.log(error);
            },
            function () {
            });
        }
    }
}
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
                var dateStart = formatDate(resul.rows[0].start);
                console.log(dateStart);
                var dateEnd = formatDate(resul.rows[0].end);
                console.log(dateEnd);
                $("#ipStart").val(dateStart);
                $("#ipEnd").val(dateEnd);
                $("#ipTitle").val(resul.rows[0].title);
                $("#ipDesc").val(resul.rows[0].content);
                $("#ipId").val(resul.rows[0].id);
            });
        } else {
            tz.executeSql("select * from events where start=?", [date], function (tz, resul) {
                var dateStart = formatDate(resul.rows[0].start);
                console.log(dateStart);
                var dateEnd = formatDate(resul.rows[0].end);
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
                console.log('deadline supprimé');
            });
        }, function (error) {
            console.log('Transaction ERROR: ' + error.message);
        }, function () {
        });
    }
}

function modifierDeadline() {
    let ipId = $("#ipId").val();
    console.log(ipId);
    let ipTitle = $("#ipTitle").val();
    let dateStart = $("#ipStart").val();
    let ipStart = dateStart.replace(/\b0/g, '');             
    let dateEnd = $("#ipEnd").val();
    let ipEnd = dateEnd.replace(/\b0/g, '');
    let ipContent = $("#ipDesc").val();
    if (ipTitle == "" || ipStart == "" || ipTitle == null || ipStart == null) {
        $("#ipAlertTitle").removeClass("hide");
    } else {
        var c = confirm("Êtes-vous sûr de modifier le Deadline? ");
        if (c) {
            let db = window.openDatabase("Events00000000", "1.0", "All Deadlines", 2000000)
            db.transaction(function (tw) {
                tw.executeSql('update events set title=?, content=?, start=?, end=? where id=?', [ipTitle, ipContent, ipStart, ipEnd, ipId], function (tw, r) {
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
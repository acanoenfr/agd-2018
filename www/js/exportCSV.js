
var donnees = [];
let db = window.openDatabase("Events00000000", "1.0", "All Deadlines", 2000000);
db.transaction(function (tx) {
    tx.executeSql('Select * from events', [], function (tx, result) {
        for (let i = 0; i < result.rows.length; i++) {
            donnees.push(result.rows[i]);
            donnees.sort(function (a, b) {
                if (a.start < b.start) {
                    return -1;
                }
                if (a.start > b.start) {
                    return 1;
                }
                return 0;
            });
        }
    });
}, function (error) {
    console.log('Transaction ERROR: ' + error.message);
}, function () {
});

function convertArrayOfObjectsToCSV(args) {
    var result, ctr, keys, columnDelimiter, lineDelimiter, data;
    data = args.data || null;
    if (data == null || !data.length) {
        return null;
    }
    columnDelimiter = args.columnDelimiter || ',   ';
    lineDelimiter = args.lineDelimiter || '\n';
    keys = Object.keys(data[0]);
    result = '';
    result += keys.join(columnDelimiter);
    result += lineDelimiter;
    /*elle parcourt l'un des obj pour creer une ligne d'en-tete, 
    suivie d'une nouvelle ligne*/
    data.forEach(function (item) {
        ctr = 0;
        /*ensuite je parcours chaque objet avec les valeurs de chaque propriete*/
        keys.forEach(function (key) {
            if (ctr > 0) result += columnDelimiter;
            result += item[key];
            ctr++;
        });
        result += lineDelimiter;
    });
    return result;
}

function moveFile() {
    window.resolveLocalFileSystemURL(cordova.file.externalApplicationStorageDirectory, function (dir) {
        dir.getDirectory('/', { create: false }, function (direc) {
            direc.getFile("Deadlines.csv", {
                create: true
            }, function (file) {
                direc.getDirectory("/AGD-2018", { create: false }, function (dirAGD) {
                    file.moveTo(dirAGD, "Deadlines.csv", function () { }, function () { });
                });
            }), function () {}
        }, function () { });
    });
}

function fichierCSV() {
    var method = confirm("Voulez-vous télecharger le fichier ?")
    if (method) {
        window.resolveLocalFileSystemURL(cordova.file.externalApplicationStorageDirectory, function (dir) {
            dir.getDirectory('/AGD-2018', { create: true }, function (dirAGD) {
                console.log('file system open: ' + dirAGD.toURL());
                dirAGD.getFile("/Deadlines.csv", {
                    create: true
                    //file exists
                }, function (file) {
                    logOb = file;
                    var csv = "";
                    csv = convertArrayOfObjectsToCSV({
                        data: donnees
                    });
                    console.log("csv-" + csv);
                    write(csv);
                });
                moveFile();
                alert("Fichier telechargé sur /AGD-2018/Deadlines.csv");
            });
        });
    }
    /*else {
        window.resolveLocalFileSystemURL(cordova.file.externalApplicationStorageDirectory, function (dir) {
            dir.getDirectory('/AGD-2018', { create: true }, function (dirAGD) {
                console.log('file system open: ' + dirAGD.toURL());
                dirAGD.getFile("/AGD-2018/Deadlines.csv", {
                    create: true
                    //file exists
                }, function (file) {
                    /*var csv = "";
                    csv = convertArrayOfObjectsToCSV({
                        data: donnees
                    });
                    contenuEmail()
                    Email.send({
                        SecureToken: "d7247933-70fc-46ae-a046-8c086c06bf07",
                        To: "team.agd.2018@gmail.com",
                        From: "AGD 2018 <team.agd.2018@gmail.com>",
                        Subject: "Export Deadlines.csv",
                        Body: contenu,
                        /*   Attachments: [
                               {
                                   name: "Deadlines.csv",
                                   path: "storage/emulated/0/AGD-2018/Deadlines.csv"
                               }]
                    //}).then(message => console.info(message))
                });
            }//file does not exist
            );
        });
    }*/
    function write(csv) {
        if (!logOb) return;
        logOb.createWriter(function (fileWriter) {
            fileWriter.seek(fileWriter.length);
            var blob = new Blob([csv], {
                type: 'text/csv'
            });
            fileWriter.write(blob);
            console.log("it worked");
        }, function () { console.log("failed") }
        );
    }
}
/* Problem avec le contenu du mail
function contenuEmail(){
    var contenu="";
    let db = window.openDatabase("Events00000000", "1.0", "All Deadlines", 2000000);
    db.transaction(function (tx) {
    tx.executeSql('Select * from events', [], function (tx, result) {
        for (let i = 0; i < result.rows.length; i++) {
          contenu +=  ((result.rows[i].title!=undefined)?result.rows[i].title:"Sans titre")+" "+((result.rows[i].contenu!=undefined)?result.rows[i].contenu:"Sans contenu")+" "+(result.rows[i].start+" "+(result.rows[i].end!=undefined)?result.rows[i].end:" ")+" <br>";
        }
    });
}, function (error) {
    console.log('Transaction ERROR: ' + error.message);
}, function () {
    console.log(contenu);
});

Email.send({
    SecureToken: "d7247933-70fc-46ae-a046-8c086c06bf07",
    To: "team.agd.2018@gmail.com",
    From: "AGD 2018 <team.agd.2018@gmail.com>",
    Subject: "Export Deadlines.csv",
    Body: contenu,
    /*   Attachments: [
           {
               name: "Deadlines.csv",
               path: "storage/emulated/0/AGD-2018/Deadlines.csv"
           }]
}).then(message => console.info(message))

return contenu;
}
*/



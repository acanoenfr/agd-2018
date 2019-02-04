function afficherHistorique() {
    var today = new Date();
    var day = today.getDate();
    var month = today.getMonth()+1;
    var year = today.getFullYear();
    var datesStart=[];
    var todayDate= formatDate("".concat(year,"-",month,"-",day));
    let db = window.openDatabase("Events00000000", "1.0", "All Deadlines", 2000000);
    db.transaction(function (tx) {
        tx.executeSql('Select * from events where start<?', [todayDate], function (tx, result) {
            for(let i=0; i<result.rows.length; i++){                      
                datesStart.push(result.rows[i]);
                datesStart[i].start=formatDate(result.rows[i].start);
                datesStart.sort(function(a,b){
                    if(a.start<b.start){
                        return -1;
                    }
                    if(a.start>b.start){
                        return 1;
                    }
                    return 0;
                })
            }                               
        $("#body").append('<table class="modal-dialog"><tr class="modal-dialog"><td class="modal-dialog"><h6>Titre</h6></td><td><h6>Description</h6></td><td><h6>Début</h6></td><td><h6>Fin</h6></td></tr>');
            for (let i = 0; i<datesStart.length; i++) { 
                $("table").append("<tr class='modal-body'><td class='modal-body'>"+datesStart[i].title+"</td><td>"+datesStart[i].content+"</td><td>"+datesStart[i].start+"</td><td>"+datesStart[i].end+"</td></tr></table>")              
             }
        });
    }, function (error) {
        console.log('Transaction ERROR: ' + error.message);
    }, function () {      
    });
}

function formatDate(date) {
    var dateN;

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
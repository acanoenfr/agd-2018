var date = findGetParameter("date");

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

formatDate (date);

console.log(date);
let myDB = window.openDatabase("Events00000000", "1.0", "All Deadlines", 2000000);
myDB.transaction(function (txn) {
    txn.executeSql("SELECT * FROM events WHERE start=?", [date], function (tx, res) {
        console.log(res);
        let list = document.getElementById("list");
        for (let i = 0; i < res.rows.length; i++) {
            let button = document.createElement("a");
            button.setAttribute('id', res.rows[i].id);
            list.append(button);
            button.append('"' + res.rows[i].title + '", ');
            if (res.rows[i].content) {
                button.append('"' + res.rows[i].content + '", ');
            }
            if (res.rows[i].end) {
                button.append('entre le ' + res.rows[i].start);
                button.append('et le ' + res.rows[i].end);
            } else {
                button.append('pour le ' + res.rows[i].start);
            }
            button.classList.add('btn');
            button.classList.add('buttn');
            button.href = "modSupDeadline.html?date=" + date + "&id=" + res.rows[i].id;
            let br = document.createElement("br");
            list.append(br);
        }
    }, function (tx, err) {
        console.warn('Err[' + err.code + ']: ' + err.message);
    });
});
// Liste les deadlines dans la console

myDB.transaction(function (txn2) {
    txn2.executeSql("SELECT * FROM events WHERE start=?", [dateCheck], function (tx2, res2) {
        for (let k = 0; k < res2.rows.length; k++) {
            console.log(res2.rows[k].title);
            console.log(res2.rows[k].content);
            console.log(res2.rows[k].start);
            console.log(res2.rows[k].end);
        }
    }, function (tx2, err2) {
        console.warn('Err[' + err.code + ']: ' + err.message);
    });
});
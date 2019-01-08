let app = {
    // Application Constructor
    initialize: function () {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false)
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function () {
        showCalendar(currentMonth, currentYear)
        showEvents()
        document.getElementById('previous').addEventListener('click', showEvents)
        document.getElementById('next').addEventListener('click', showEvents)
        let myDB = window.openDatabase("Events0000000", "1.0", "All Deadlines", 2000000)
        myDB.transaction(function (txn) {
            txn.executeSql("CREATE TABLE IF NOT EXISTS events (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL, content TEXT, color TEXT NOT NULL, start TEXT NOT NULL, end TEXT)", [], function (tx, res) {
                console.info('Create table events')
            }, function (tx, err) {
                console.warn('Err[' + err.code + ']: ' + err.message)
            })
            /* txn.executeSql(`INSERT INTO events(title, color, start) VALUES(?, ?, ?)`, ['Event', '#0000ff', '2019-1-15'], function (tx, res) {
                console.info('Insert data in events')
            }, function (tx, err) {
                console.warn('Err[' + err.code + ']: ' + err.message)
            }); */
        })
        myDB.transaction(function (txn) {
            txn.executeSql("SELECT * FROM events", [], function (tx, res) {
                console.info(res.rows)
            }, function (tx, err) {
                console.warn('Err[' + err.code + ']: ' + err.message)
            })
        })
    }
}

app.initialize()

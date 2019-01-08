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
        let myDB = window.sqlitePlugin.openDatabase({
            name: "agd-2018.db",
            location: "default",
            androidDatabaseProvider: "system"
        })
        myDB.transaction(function (txn) {
            txn.executeSql("CREATE TABLE IF NOT EXISTS events (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL, content TEXT, color TEXT NOT NULL, start TEXT NOT NULL, end TEXT)")
        })
        myDB.transaction(function (txn) {
           txn.executeSql('SELECT * FROM events', [], function (tx, res) {
               console.log(res.rows)
           }, function (tx, err) {
               console.warn(err)
           })
        })
    }
}

app.initialize()

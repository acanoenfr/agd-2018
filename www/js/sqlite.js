let myDB = window.sqlitePlugin.openDatabase({
    name: "agd-2018.db",
    location: "default",
    androidDatabaseProvider: "system"
})

// First launch
myDB.transaction((txn) => {
    txn.executeSql("CREATE TABLE IF NOT EXISTS events (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL, content TEXT, color TEXT NOT NULL, start TEXT NOT NULL, end TEXT)")
})

myDB.transaction((txn) => {
   txn.execute('SELECT * FROM events', [], (tx, res) => {
       console.log(res.rows)
   }, (tx, err) => {
       console.warn(err)
   })
})

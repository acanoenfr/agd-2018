let app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false)
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        showCalendar(currentMonth, currentYear)
        const copyDatabaseFile = (dbName) => {
            let sourceFileName = `${cordova.file.applicationDirectory}www/${dbName}`
            let targetDirName = cordova.file.dataDirectory
            return Promise.all([
              new Promise((resolve, reject) => {
                resolveLocalFileSystemURL(sourceFileName, resolve, reject)
              }),
              new Promise((resolve, reject) => {
                resolveLocalFileSystemURL(targetDirName, resolve, reject)
              })
            ]).then((files) => {
              console.log('ok')
              let sourceFile = files[0]
              let targetDir = files[1]
              return new Promise((resolve, reject) => {
                targetDir.getFile(dbName, {}, resolve, reject)
              }).then(() => {
                console.log("file already copied")
              }).catch(() => {
                console.log("file doesn't exist, copying it")
                return new Promise((resolve, reject) => {
                  sourceFile.copyTo(targetDir, dbName, resolve, reject)
                }).then(() => {
                  console.log("database file copied")
                })
              })
            })
        }
        // copyDatabaseFile('agd-2018.db').then(() => {
            let db = sqlitePlugin.openDatabase('agd-2018.db')
            db.transaction((txn) => {
                txn.executeSql(`SELECT * FROM events WHERE start LIKE '${currentYear}-${currentMonth}-%'`, [], (tx, res) => {
                    console.log(res)
                })
            })
        // }).catch((err) => {
        //     console.log(err)
        // })
    }
}

app.initialize()

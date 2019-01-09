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
        let myDB = window.openDatabase("Events0000000", "1.0", "All Deadlines", 2000000)
        myDB.transaction(function (txn) {
            txn.executeSql("CREATE TABLE IF NOT EXISTS events (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL, content TEXT, color TEXT NOT NULL, start TEXT NOT NULL, end TEXT)")
            // txn.executeSql(`INSERT INTO events(title, color, start, end) VALUES(?, ?, ?, ?)`, ['Rattrapage TP SQL', '#ff0000', '2019-2-14', '2019-2-28'])
        })
        showCalendar(currentMonth, currentYear)
        showEvents()
        document.getElementById('previous').addEventListener('click', showEvents)
        document.getElementById('next').addEventListener('click', showEvents)
        function showEvents() {
            myDB.transaction(function (txn) {
                txn.executeSql("SELECT * FROM events", [], function (tx, res) {
                    console.info(res.rows)
                    let events = res.rows

                    let checkListener; // Pour vérifier si il y a déjà un event listener sur la date
                    let dateCheck; // Stocke la date de la case cliquée pour la requête SQL affichant les deadlines du jour
                    let dateTemp; // Deadline tampon pour vérifier si il y a déjà une deadline sur la date actuelle (Pour l'event listener)

                    for (let i = 0; i < res.rows.length; i++) {
                        date = events[i].start.split('-')

                        dateTemp = events[i].start; // Mise en tampon de la date en cours
                        if(dateTemp != dateCheck) checkListener++; // Incrémente checkListener de 1 si il on est déjà passé sur cette date

                        if (currentMonth == date[1] - 1 && currentYear == date[0]) {
                            let elementStart = document.getElementById(events[i].start)
                            let elementEnd = document.getElementById(events[i].end)
                            if (!events[i].end) {
                                elementStart.setAttribute('class', 'event')
                                let icon = document.createElement('i')
                                icon.setAttribute('class', 'fas fa-star')
                                icon.setAttribute('style', `color: ${events[i].color}; font-size: 1rem;`)
                                elementStart.appendChild(icon)

                                if (checkListener == 0) {
                                    checkListener++;

                                    elementStart.addEventListener('click', function(){

                                        /* Tout ça sert à afficher les deadlines dans la console */
                                        dateCheck = events[i].start;
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

                                        //window.location = 'modSupDeadline.html'
                                    })
                                }
                            } else {
                                elementStart.setAttribute('class', 'event')
                                elementEnd.setAttribute('class', 'event')
                                let icon1 = document.createElement('i')
                                icon1.setAttribute('class', 'fas fa-chevron-circle-right')
                                icon1.setAttribute('style', `color: ${events[i].color}; font-size: 1rem;`)
                                elementStart.appendChild(icon1)
                                let icon2 = document.createElement('i')
                                icon2.setAttribute('class', 'fas fa-chevron-circle-left')
                                icon2.setAttribute('style', `color: ${events[i].color}; font-size: 1rem;`)
                                elementEnd.appendChild(icon2)
                                elementStart.addEventListener('click', function(){
                                    window.location = 'modSupDeadline.html'
                                })
                                elementEnd.addEventListener('click', function(){
                                    window.location = 'modSupDeadline.html'
                                })
                            }
                        }
                    }
                }, function (tx, err) {
                    console.warn('Err[' + err.code + ']: ' + err.message)
                })
            })
        }
    }
}

app.initialize()

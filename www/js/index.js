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
         /*Email.send({
            Host: "Your-email-hosting",
            Username: "Your-email@hosting.com",
            Password: "Email-password",
            To: "Your-email",
            From: "AGD-2018 <agd-2018@univ-littoral.fr>",
            Subject: "Test email",
            Body: "Content of this email"
        }).then(message => alert("Email sent")) */
        let myDB = window.openDatabase("Events00000000", "1.0", "All Deadlines", 2000000)
        myDB.transaction(function (txn) {
            txn.executeSql("CREATE TABLE IF NOT EXISTS events (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL, content TEXT, start TEXT NOT NULL, end TEXT)")
            // txn.executeSql(`INSERT INTO events(title, color, start, end) VALUES(?, ?, ?, ?)`, ['Rattrapage TP SQL', '#ff0000', '2019-2-14', '2019-2-28'])
        })
        showCalendar(currentMonth, currentYear)
        showEvents()
        document.getElementById('previous').addEventListener('click', showEvents)
        document.getElementById('next').addEventListener('click', showEvents)
        function showEvents() {
            myDB.transaction(function (txn) {
                txn.executeSql("SELECT * FROM events GROUP BY start", [], function (tx, res) {
                    console.info(res.rows)
                    let events = res.rows

                    let dateCheck; // Stocke la date de la case cliquée pour la requête SQL affichant les deadlines du jour
                    var datesCheckArray = []; // Stocker les dates avec déjà une deadline
                    let laDateGet;

                    for (let i = 0; i < res.rows.length; i++) {
                        date = events[i].start.split('-')

                        if (currentMonth == date[1] - 1 && currentYear == date[0]) {
                            let elementStart = document.getElementById(events[i].start)
                            let elementEnd = document.getElementById(events[i].end)
                            if (!events[i].end) {
                                txn.executeSql("SELECT COUNT(*) AS number FROM events WHERE start = ?", [events[i].start], function (tx2, res2) {
                                    elementStart.setAttribute('class', 'event');
                                    let icon = document.createElement('span');
                                    icon.setAttribute('style', `color: white; font-size: 1rem; background-color: blue; width: 1.6rem; border-radius: 25%;`);
                                    icon.innerHTML = res2.rows[0].number;
                                    elementStart.appendChild(icon);
                                })

                                elementStart.addEventListener('click', function () {
                                    laDateGet = elementStart.id;
                                    //if (nbRows == 1) {
                                        window.location.assign("modSupDeadline.html?date=" + laDateGet);
                                    /*} else {
                                        window.location.assign("list.html?date=" + laDateGet);
                                    }*/
                                })
                            } else {
                                elementStart.setAttribute('class', 'event')
                                elementEnd.setAttribute('class', 'event')
                                let icon1 = document.createElement('i')
                                icon1.setAttribute('class', 'fas fa-chevron-circle-right')
                                icon1.setAttribute('style', `color: red; font-size: 1rem;`)
                                elementStart.appendChild(icon1)
                                let icon2 = document.createElement('i')
                                icon2.setAttribute('class', 'fas fa-chevron-circle-left')
                                icon2.setAttribute('style', `color: red; font-size: 1rem;`)
                                elementEnd.appendChild(icon2)
                                elementStart.addEventListener('click', function () {
                                    laDateGet = elementStart.id;
                                    window.location.assign("modSupDeadline.html?date=" + laDateGet);
                                })
                                elementEnd.addEventListener('click', function () {
                                    laDateGet = elementStart.id;
                                    window.location.assign("modSupDeadline.html?date=" + laDateGet);
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
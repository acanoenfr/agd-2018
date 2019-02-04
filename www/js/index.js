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
        let myDB = window.openDatabase("Events00000000", "1.0", "All Deadlines", 2000000)
        myDB.transaction(function (txn) {
            txn.executeSql("CREATE TABLE IF NOT EXISTS events (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL, content TEXT, start DATE NOT NULL, end DATE)")
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
                                    window.location.assign("processDate.html?date=" + laDateGet);
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
                                    window.location.assign("processDate.html?date=" + laDateGet);
                                })
                                elementEnd.addEventListener('click', function () {
                                    laDateGet = elementStart.id;
                                    window.location.assign("processDate.html?date=" + laDateGet);
                                })
                            }
                        }
                    }
                }, function (tx, err) {
                    console.warn('Err[' + err.code + ']: ' + err.message)
                })
            })
        }
        // Send notification function
        function sendNotif(mail, name, start, content = null, end = null) {
            let color = "#0000ff"
            let type = (color === "#0000ff") ? "fixe" : "floue"
            type = `<font color="${color}">${type}</font>`
            content = (content !== null) ? content : "Aucun contenu"
            name = `<strong>${name}</strong>`
            let startFormat = setDateFormat(start)
            let endFormat = setDateFormat(end)
            Email.send({
                SecureToken: "d7247933-70fc-46ae-a046-8c086c06bf07",
                To: mail,
                From: "AGD 2018 <team.agd.2018@gmail.com>",
                Subject: "[Notification] MyDeadlines",
                Body: `Bonjour,<br>
Nous vous rappelons que vous avez une deadline ${type} (${name} : ${content}) à la date du ${startFormat}.<br>
Cordialement,<br>
AGD-2018`
            }).then(message => console.info(message))
        }

        // Set date format function
        function setDateFormat(date) {
            if (date !== null) {
                date = date.split("-")
                return `<em>${addZero(date[2])}/${addZero(date[1])}/${date[0]}</em>`
            }
            return null
        }

        // Add zeros if integer is inferior to 10
        function addZero(int) {
            if (int < 10) {
                return `0${int}`
            }
            return `${int}`
        }

        setTimeout(function(){
            sendNotif("", "Devoir à rendre pour les TP1A", "2019-2-25", "De 10H à 11H")
            cordova.plugins.notification.local.schedule([
                {
                    id: 0,
                    title: "Devoir à rendre pour les TP1A",
                    text: "De 10H à 11H",
                    trigger: {
                        // at: new Date("2019-01-23 14:10:00")
                        in: 5,
                        unit: "second"
                    },
                    vibrate: true
                }
            ])
        }, Date.now() + 5000 - Date.now())
    }
}

app.initialize()

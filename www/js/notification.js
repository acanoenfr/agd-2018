// Send notification function
function sendNotif(mail, name, start, content = null, fixed = true, end = null) {
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

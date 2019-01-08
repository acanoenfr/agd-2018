const readJson = (file, callback) => {
    let rawFile = new XMLHttpRequest()
    rawFile.overrideMimeType("application/json")
    rawFile.open("GET", file, true)
    rawFile.onreadystatechange = () => {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText)
        }
    }
    rawFile.send(null)
}

const showEvents = () => {
    readJson("data/events.json", (data) => {
        let events = JSON.parse(data)
        events.forEach((event) => {
            date = event.start.split('-')
            if (currentMonth == date[1] - 1 && currentYear == date[0]) {
                let element = document.getElementById(event.start)
                // element.setAttribute('class', 'event')
                let icon = document.createElement('i')
                icon.setAttribute('class', 'fas fa-circle')
                icon.setAttribute('style', `color: ${event.color}; font-size: .5rem;`)
                element.appendChild(icon)
                element.addEventListener('click', function(){
                    window.location='modSupDeadline.html';
                     }); 
            }
        })
    })
}

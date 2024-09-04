function parseCookies(raw) {
    let cookies = {}
    raw.split(";").forEach(line => {
        let split_line = line.split("=")
        cookies[split_line[0]] = split_line[1]
    });
    return cookies
}

window.onload = (event) => {
    let cookies = parseCookies(document.cookie)
    if(cookies.session_id) {
        document.getElementById("logged_out").hidden = true
    }
    else {
        document.getElementById("logged_in").hidden = true
    }

    fetch('/profile')
    .then(data => {
        data.text().then(val => {
            document.getElementById("username").innerHTML = val
        })
    })
}
// console.log("hello")
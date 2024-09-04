let anime_post_el, type_radioset, status_radioset;

function togglePost() {
    anime_post_el.hidden = !anime_post_el.hidden;
}

function disablePost() {
    anime_post_el.hidden = true;
}

function statusSet(event) {
    status_radioset.forEach(element => {
        element.disabled = false;
    });
    event.target.disabled = true;
    document.getElementById("status_dummy").setAttribute('value', event.target.id.split("_")[1])
}

function typeSet(event) {
    type_radioset.forEach(element => {
        element.disabled = false;
    });
    event.target.disabled = true;
    document.getElementById("type_dummy").setAttribute('value', event.target.id.split("_")[1])
}

async function getAnimes() {
    let animes = await (await fetch('/anime_api', {
        method: "get"
    })).json()
    const base_tag = document.getElementById("animes_list")
    animes.forEach((anime) => {
        let htmlc = `
        <a href="/anime/${anime._id}">
            <div class="card">
                <image src="${anime.image_url}" alt="anime poster">
                <div class="card_title">${anime.name}</div>
                <div class="subtext">${anime.status[0]}, ${anime.type[0]}</div>
                <div class="subtext">${anime.release_year}</div>
            </div>
        </a>
        `
        console.log(htmlc)
        base_tag.innerHTML += htmlc
    })
}

window.onload = (event) => {
    getAnimes()
    anime_post_el = document.getElementById("add_anime")
    type_radioset = [document.getElementById("form_movie"),document.getElementById("form_series")]
    status_radioset = [document.getElementById("form_airing"),document.getElementById("form_completed"),document.getElementById("form_releasing")]
    status_radioset.forEach(button => {
        button.addEventListener('click', statusSet)
    });
    type_radioset.forEach(button => {
        button.addEventListener('click', typeSet)
    });
    let form = document.getElementById("form");
    form.onsubmit = async function(event) {
        event.preventDefault()
        console.log("hello");
        let res = await fetch("/anime", {
            method: "post",
            body: JSON.stringify(Object.fromEntries(new FormData(form))),
            headers: {
                "Content-Type": "application/json"
            }
        })
    }
}
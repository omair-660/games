let scrol = document.querySelector(".scroll");

window.onscroll = function() {
    if (window.scrollY >= 500) {
        scrol.classList.add("show");
    } else {
        scrol.classList.remove("show");
    }
}

scrol.addEventListener("click", function() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

let arrayContent = [];
let loader = document.querySelector(".load");

async function getGame(cate) {
    showLoader();
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': 'b0bf1411afmsh3e8754559654adfp1080c5jsnf06d1c0d4285',
            'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com'
        }
    };
    let api = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/games?category=${cate}`, options);
    let gameData = await api.json();
    arrayContent = gameData;
    displayGames(arrayContent);
    hideLoader();
}

async function getGameDetails(id) {
    showLoader();
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': 'b0bf1411afmsh3e8754559654adfp1080c5jsnf06d1c0d4285',
            'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com'
        }
    };
    let api = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/game?id=${id}`, options);
    let gameDetailsData = await api.json();
    displayGameDetails(gameDetailsData);
    hideLoader();
}

let close = document.querySelector(".close");
let details = document.querySelector(".details");

close.addEventListener("click", function() {
    details.classList.add("d-none");
})

function displayGames() {
    let content = '';
    for (let i = 0; i < arrayContent.length; i++) {
        content += `
        <div class="col-lg-3 col-md-6 mb-4 cart" data-id="${arrayContent[i].id}">
            <div class="box border border-black rounded-2 overflow-hidden">
                <div class="image p-2">
                    <img src="${arrayContent[i].thumbnail}" class="w-100 card-img-top h-100 rounded-2" alt="">
                </div>
                <div class="text p-2">
                    <div class="d-flex justify-content-between align-items-center">
                        <h6 class="h6 small m-0">${arrayContent[i].title}</h6>
                        <button class="btn btn-primary py-0 px-1">free</button>
                    </div>
                    <p class="card-text text-center small opacity-50 py-2">${arrayContent[i].short_description}</p>
                    <div class="d-flex justify-content-between align-items-center flex-wrap">
                        <p class="small badge bg-secondary bg-opacity-25">${arrayContent[i].genre}</p>
                        <p class="small badge bg-secondary bg-opacity-25">${arrayContent[i].platform}</p>
                    </div>
                    
                        <div class="date">
                            <h6 class="text-center m-0">Release Date</h6>
                            <p class="text-center small mt-1">${arrayContent[i].release_date}</p>
                        </div>
                    
                </div>
            </div>
        </div>
        `;
    }
    let row = document.querySelector(".game .row");
    row.innerHTML = content;
    
    let carts = document.querySelectorAll(".cart");
    for (let i = 0; i < carts.length; i++) {
        carts[i].addEventListener("click", function() {
            let gameId = this.getAttribute('data-id');
            getGameDetails(gameId);
            details.classList.remove("d-none");
        });
    }
}

function displayGameDetails(details) {
    let content = `
        <div class="col-md-5">
            <div class="">
                <img src="${details.thumbnail}" alt="${details.title}" class="w-100">
            </div>
        </div>
        <div class="col-md-7">
            <div class="">
                <h2>title: ${details.title}</h2>
                <h5 class="my-2">category: <span class="bg-info badge text-dark rounded-4 p-2">${details.genre}</span></h5><br>
                <h5 class="my-2">Platform: <span class="bg-info badge text-dark rounded-4 p-2">${details.platform}</span></h5><br>
                <h5 class="my-2">Status: <span class="bg-info badge text-dark rounded-4 p-2">${details.status}</span></h5><br>
                <p>${details.description}.</p>
                <button class="btn btn-outline-warning"><a href="${details.game_url}" target="_blank">Play Now</a></button>
            </div>
        </div>
    `;
    let row = document.querySelector(".details .row");
    row.innerHTML = content;
}

function showLoader() {
    loader.style.display = "flex";
}

function hideLoader() {
    loader.style.display = "none";
}

getGame("mmorpg");

let links = Array.from(document.querySelectorAll(".nav-link"));
for (let i = 0; i < links.length; i++) {
    links[i].addEventListener("click", function() {
        for (let j = 0; j < links.length; j++) {
            links[j].classList.remove("active");
        }
        links[i].classList.add("active");
        getGame(links[i].innerText.toLowerCase());
    });
}


let body = document.querySelector("body");
let moon = document.querySelector(".moon");
let sun = document.querySelector(".sun");

sun.addEventListener("click",function(){
    body.classList.add("light");
    sun.classList.add("d-none");
    moon.classList.remove("d-none");
})
moon.addEventListener("click",function(){
    body.classList.add("dark");
    body.classList.remove("light");
    moon.classList.add("d-none");
    sun.classList.remove("d-none");
})
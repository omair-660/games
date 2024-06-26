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
let arrayContent=[];

async function getGame() {
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': 'b0bf1411afmsh3e8754559654adfp1080c5jsnf06d1c0d4285',
            'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com'
        }
    };
    let api = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/games?category=mmorpg`,options)
    let gameData = await api.json();
    arrayContent = gameData ;

    displayGams(arrayContent)

}


function displayGams(){
    let content = '';
    for(let i = 0 ; i <arrayContent.length; i++ ){
        content+=`
        <div class="col-lg-3 col-md-6 mb-4 cart">
        <div class="box border border-black rounded-2 overflow-hidden">
            <div class="image p-2">
                <img src="${arrayContent[i].thumbnail}" class="w-100 card-img-top h-100 rounded-2" alt="">
            </div>
            <div class="text p-2">
               <div class=" d-flex justify-content-between align-items-center ">
                    <h6 class="h6 small m-0">${arrayContent[i].title}</h6>
                <button class="btn btn-primary py-0 px-1">free</button>
               </div>
               <p class="card-text text-center small opacity-50 py-2">${arrayContent[i].short_description}</p>
            <div class="d-flex justify-content-between align-items-center flex-wrap">
                <p class="small badge bg-secondary bg-opacity-25">${arrayContent[i].genre}</p>
                <p class="small badge bg-secondary bg-opacity-25">${arrayContent[i].platform}</p>

            </div>
           <div class="none overflow-hidden">
           <div class="date">
           <h6 class="text-center m-0">Release Date</h6>
           <p class="text-center small mt-1">${arrayContent[i].release_date}</p>
           </div>
           </div>
            </div>
        </div>
    </div>
        `
    }
    let row = document.querySelector(".row");
    row.innerHTML = content
}


getGame()
{/* <a href="${arrayContent[i].game_url}" target="_blank">Play Now</a> */}


let links = Array.from(document.querySelectorAll(".nav-link"));
for (let i = 0; i < links.length; i++) {
    links[i].addEventListener("click",function(){
        for (let j = 0; j < links.length; j++) {
            links[j].classList.remove("active");
        }
        links[i].classList.add("active")

    })   
}
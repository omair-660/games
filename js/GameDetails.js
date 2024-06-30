
export class GameDetails {
    constructor() {
        this.close = document.querySelector(".close");
        this.details = document.querySelector(".details");
        this.row = document.querySelector(".details .row");
        this.init();
    }

    async getGameDetails(id) {
        this.showLoader();
        const options = {
            method: 'GET',
            headers: {
                'x-rapidapi-key': 'b0bf1411afmsh3e8754559654adfp1080c5jsnf06d1c0d4285',
                'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com'
            }
        };
        let api = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/game?id=${id}`, options);
        let gameDetailsData = await api.json();
        this.displayGameDetails(gameDetailsData);
        this.hideLoader();
    }

    displayGameDetails(detailsData) {
        let content = `
            <div class="col-md-5">
                <div class="">
                    <img src="${detailsData.thumbnail}" alt="${detailsData.title}" class="w-100 rounded-2">
                </div>
            </div>
            <div class="col-md-7">
                <div class="">
                    <h2>title: ${detailsData.title}</h2>
                    <h5 class="my-2 fs-6">category: <span class="bg-info badge text-dark rounded-4 p-2">${detailsData.genre}</span></h5>
                    <h5 class="my-2 fs-6">Platform: <span class="bg-info badge text-dark rounded-4 p-2">${detailsData.platform}</span></h5>
                    <h5 class="my-2 fs-6">Status: <span class="bg-info badge text-dark rounded-4 p-2">${detailsData.status}</span></h5>
                    <p class="small mt-2">${detailsData.description}.</p>
                    <button class="btn btn-outline-warning"><a href="${detailsData.game_url}" target="_blank">Play Now</a></button>
                </div>
            </div>
        `;
        this.row.innerHTML = content;
        this.details.classList.remove("d-none");
    }

    showLoader() {
        document.querySelector(".load").style.display = "flex";
    }

    hideLoader() {
        document.querySelector(".load").style.display = "none";
    }

    init() {
        this.close.addEventListener("click", () => {
            this.details.classList.add("d-none");
        });
    }
}

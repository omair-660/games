
import { GameDetails } from './GameDetails.js';

export class GameList {
    constructor() {
        this.arrayContent = [];
        this.loader = document.querySelector(".load");
        this.row = document.querySelector(".game .row");
        this.links = Array.from(document.querySelectorAll(".nav-link"));
        this.body = document.querySelector("body");
        this.moon = document.querySelector(".moon");
        this.sun = document.querySelector(".sun");
        this.scrollButton = document.querySelector(".scroll");
        this.section = $("section");
        this.nav = $("nav");
        this.init();
    }

    async getGame(cate) {
        this.showLoader();
        const options = {
            method: 'GET',
            headers: {
                'x-rapidapi-key': 'b0bf1411afmsh3e8754559654adfp1080c5jsnf06d1c0d4285',
                'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com'
            }
        };
        try {
            let api = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/games?category=${cate}`, options);
            let gameData = await api.json();
            this.arrayContent = gameData;
            this.displayGames();
        } catch (error) {
            console.error('Error fetching game data:', error);
        } finally {
            this.hideLoader();
        }
    }

    displayGames() {
        let content = '';
        for (let i = 0; i < this.arrayContent.length; i++) {
            content += `
            <div class="col-lg-3 col-md-6 mb-4 cart" data-id="${this.arrayContent[i].id}">
                <div class="box border border-black rounded-2 overflow-hidden">
                    <div class="image p-2">
                        <img src="${this.arrayContent[i].thumbnail}" class="w-100 card-img-top h-100 rounded-2" alt="${this.arrayContent[i].title}">
                    </div>
                    <div class="text p-2">
                        <div class="d-flex justify-content-between align-items-center">
                            <h6 class="h6 small m-0">${this.arrayContent[i].title}</h6>
                            <button class="btn btn-primary py-0 px-1">free</button>
                        </div>
                        <p class="card-text text-center small opacity-50 py-2">${this.arrayContent[i].short_description}</p>
                        <div class="d-flex justify-content-between align-items-center flex-wrap">
                            <p class="small badge bg-secondary bg-opacity-25">${this.arrayContent[i].genre}</p>
                            <p class="small badge bg-secondary bg-opacity-25">${this.arrayContent[i].platform}</p>
                        </div>
                        
                            <div class="date">
                                <h6 class="text-center m-0">Release Date</h6>
                                <p class="text-center small mt-1">${this.arrayContent[i].release_date}</p>
                            </div>
                        
                    </div>
                </div>
            </div>
            `;
        }
        this.row.innerHTML = content;
        
        let carts = document.querySelectorAll(".cart");
        carts.forEach(cart => {
            cart.addEventListener("click", (event) => {
                let gameId = event.currentTarget.getAttribute('data-id');
                let gameDetails = new GameDetails();
                gameDetails.getGameDetails(gameId);
            });
        });
    }

    showLoader() {
        this.loader.style.display = "flex";
    }

    hideLoader() {
        this.loader.style.display = "none";
    }

    toggleMode() {
        this.sun.addEventListener("click", () => {
            this.body.classList.add("light");
            this.body.classList.remove("dark");
            this.sun.classList.add("d-none");
            this.moon.classList.remove("d-none");
        });

        this.moon.addEventListener("click", () => {
            this.body.classList.add("dark");
            this.body.classList.remove("light");
            this.moon.classList.add("d-none");
            this.sun.classList.remove("d-none");
        });
    }

    handleScroll() {
        window.addEventListener("scroll", () => {
            if (window.scrollY >= 500) {
                this.scrollButton.classList.add("show");
            } else {
                this.scrollButton.classList.remove("show");
            }
        });

        this.scrollButton.addEventListener("click", () => {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }

    animateSection() {
        this.section.animate({ width: "100%" }, 1000)
            .animate({ height: "auto" }, 1000, () => {
                this.nav.show(1000, () => {
                    $(".cart").fadeIn(1000);
                });
            });
    }

    init() {
        this.getGame("mmorpg");

        this.links.forEach(link => {
            link.addEventListener("click", (event) => {
                event.preventDefault();
                this.links.forEach(link => link.classList.remove("active"));
                event.currentTarget.classList.add("active");
                this.getGame(event.currentTarget.innerText.toLowerCase());
            });
        });

        this.toggleMode();
        this.handleScroll();
        this.animateSection();
    }
}

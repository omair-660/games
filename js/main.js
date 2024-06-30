
import { GameList } from './GameList.js';

document.addEventListener("DOMContentLoaded", () => {
    new GameList();
});

let spans = document.querySelector(".spans");
let span = document.querySelectorAll(".spans span");

spans.addEventListener("click",function(){
    for (let i = 0; i < span.length; i++) {
       span[i].classList.toggle("active")
        
    }
})
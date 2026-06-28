const music = document.getElementById("bgMusic");
const startBtn = document.getElementById("startBtn");
const musicBtn = document.getElementById("musicBtn");

const typing = document.getElementById("typing");
const gallery = document.getElementById("galleryContainer");
const reasonList = document.getElementById("reasonList");

let data = {};
let playing = false;

window.addEventListener("load", async () => {

    document.getElementById("loading").style.display = "none";

    const res = await fetch("content.json");
    data = await res.json();

    document.title = data.title;

    loadGallery();

    loadReasons();

});

function loadGallery(){

    gallery.innerHTML = "";

    data.photos.forEach(photo=>{

        const card = document.createElement("div");

        card.className = "card fade";

        card.innerHTML = `
        <img src="${photo.image}">
        <div class="caption">${photo.caption}</div>
        `;

        gallery.appendChild(card);

    });

}

function loadReasons(){

    reasonList.innerHTML = "";

    data.reasons.forEach(text=>{

        const li = document.createElement("li");

        li.textContent = "❤️ " + text;

        reasonList.appendChild(li);

    });

}

startBtn.onclick = ()=>{

    document.getElementById("letter").scrollIntoView({
        behavior:"smooth"
    });

    if(!playing){

        music.play();

        playing = true;

    }

    typing.innerHTML="";

    typeLetter();

};

let line = 0;

let char = 0;

function typeLetter(){

    if(line>=data.letter.length){

        confetti({

            particleCount:180,

            spread:120

        });

        return;

    }

    if(char<data.letter[line].length){

        typing.innerHTML += data.letter[line].charAt(char);

        char++;

        setTimeout(typeLetter,40);

    }else{

        typing.innerHTML += "<br><br>";

        line++;

        char=0;

        setTimeout(typeLetter,350);

    }

}

musicBtn.onclick=()=>{

    if(playing){

        music.pause();

        playing=false;

    }else{

        music.play();

        playing=true;

    }

};

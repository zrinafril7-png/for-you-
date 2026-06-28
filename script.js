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
/* ==========================================
   Floating Hearts
========================================== */

function createHeart() {

    const heart = document.createElement("div");

    heart.innerHTML = "💖";

    heart.style.position = "fixed";
    heart.style.left = Math.random() * window.innerWidth + "px";
    heart.style.bottom = "-30px";
    heart.style.fontSize = (20 + Math.random() * 20) + "px";
    heart.style.pointerEvents = "none";
    heart.style.zIndex = "9999";
    heart.style.transition = "all 6s linear";
    heart.style.opacity = "1";

    document.body.appendChild(heart);

    requestAnimationFrame(() => {
        heart.style.transform =
            `translateY(-${window.innerHeight + 100}px)
             translateX(${(Math.random()-0.5)*200}px)
             rotate(${Math.random()*360}deg)`;

        heart.style.opacity = "0";
    });

    setTimeout(() => {
        heart.remove();
    }, 6000);

}

setInterval(createHeart, 800);


/* ==========================================
   Scroll Animation
========================================== */

const observer = new IntersectionObserver((entries)=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            entry.target.classList.add("fade");

        }

    });

});

document.querySelectorAll("section").forEach(section=>{

    observer.observe(section);

});


/* ==========================================
   Simpan Posisi Musik
========================================== */

music.addEventListener("timeupdate",()=>{

    localStorage.setItem("music-time",music.currentTime);

});

window.addEventListener("load",()=>{

    const t = localStorage.getItem("music-time");

    if(t){

        music.currentTime = Number(t);

    }

});


/* ==========================================
   Klik Dimana Saja = Confetti Kecil
========================================== */

document.addEventListener("click",()=>{

    confetti({

        particleCount:15,

        spread:35,

        origin:{
            y:0.8
        }

    });

});


/* ==========================================
   Ubah Judul Saat Tab Diganti
========================================== */

const originalTitle = document.title;

document.addEventListener("visibilitychange",()=>{

    if(document.hidden){

        document.title = "Balik lagi ya ❤️";

    }else{

        document.title = originalTitle;

    }

});


/* ==========================================
   Smooth Fade Body
========================================== */

document.body.classList.add("fade");

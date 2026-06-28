// ======================
// Ambil Elemen
// ======================

const bgMusic = document.getElementById("bgMusic");
const musicBtn = document.getElementById("musicBtn");
const openLetter = document.getElementById("openLetter");

const heroTitle = document.getElementById("heroTitle");
const heroSubtitle = document.getElementById("heroSubtitle");

const typingText = document.getElementById("typingText");

const gallery = document.getElementById("gallery");

const reasonList = document.getElementById("reasonList");

const quote = document.getElementById("quote");

const endingTitle = document.getElementById("endingTitle");

const endingText = document.getElementById("endingText");

let data;

let quoteIndex = 0;

let musicPlaying = false;

// ======================
// Load JSON
// ======================

async function loadData(){

    const response = await fetch("content.json");

    data = await response.json();

    heroTitle.textContent = data.website.heroTitle;

    heroSubtitle.textContent = data.website.heroSubtitle;

    endingTitle.textContent = data.ending.title;

    endingText.textContent = data.ending.text;

    loadGallery();

    loadReasons();

    changeQuote();

}

loadData();

// ======================
// Musik
// ======================

musicBtn.onclick = ()=>{

    if(musicPlaying){

        bgMusic.pause();

        musicPlaying=false;

    }else{

        bgMusic.play();

        musicPlaying=true;

    }

};

// ======================
// Surat
// ======================

openLetter.onclick = ()=>{

    document.getElementById("letter").scrollIntoView({

        behavior:"smooth"

    });

    if(!musicPlaying){

        bgMusic.play();

        musicPlaying=true;

    }

    typingText.innerHTML="";

    typeLetter();

};

let line=0;

let char=0;

function typeLetter(){

    if(line>=data.letter.length){

        return;

    }

    if(char<data.letter[line].length){

        typingText.innerHTML+=data.letter[line][char];

        char++;

        setTimeout(typeLetter,40);

    }else{

        typingText.innerHTML+="<br><br>";

        line++;

        char=0;

        setTimeout(typeLetter,300);

    }

}

// ======================
// Gallery
// ======================

function loadGallery(){

    gallery.innerHTML="";

   

let maincontainerEle = document.getElementById("maincontainer");
let themeIcon = document.getElementById("themeIcon");
let showPlayList = document.getElementById("showPlayList");
let musicInfo = Array.from(document.getElementsByClassName('musicInfo'));
let masterPlay = document.getElementById("iconPlay");
let progressBar = document.getElementById("myprogressbar");
let splashScreenEle = document.getElementById("splashscreen");
let bodyContainer = document.getElementById("bodycontainer");
let listEle = document.getElementById("showPlayList");
let songDuration = document.getElementById('songDuration');
let songCurrentTime = document.getElementById("songCurrentTime");
let coverImage = document.getElementById("coverImg");
let songName = document.getElementById('songName');
let songArtist = document.getElementById('artistName');

function openUp() {
    splashScreenEle.style.display = "none";
    maincontainerEle.style.display = "block";
}

function closeDown() {
    splashScreenEle.style.display = "block";
    maincontainerEle.style.display = "none";
    splashScreenEle.style.height = '680px';
    bodyContainer.style.backgroundImage = 'linear-gradient(rgb(243 90 148 / 88%), rgb(150 110 137))';
    if (masterPlay.classList.contains("fa-circle-pause")) {
        masterPlay.classList.remove("fa-circle-pause");
        masterPlay.classList.add("fa-circle-play");
        audioElement.pause();
    }
}
function openPlayList() {
    
    listEle.style.height = "350px";
    listEle.style.display = "block";

}

function closeBtn() {
    listEle.style.height = "0px";
    if (listEle.style.display == "none")
        listEle.style.display = "block";
    else
        listEle.style.display = "none";
  
}

function changeTheme() {
    
    if (themeIcon.classList.contains('fa-regular')) {
        maincontainerEle.style.backgroundColor = 'white';
        maincontainerEle.style.color = '#181123';
        themeIcon.classList.remove("fa-regular");
        themeIcon.classList.add("fa-solid");
        showPlayList.style.backgroundColor = "whitesmoke";
        showPlayList.style.backgroundImage = 'none';
        musicInfo.forEach((element) => {
            element.style.backgroundColor = "white";
            element.style.color = "#181123";
        });


    } else {
        maincontainerEle.style.backgroundColor = '#181123';
        maincontainerEle.style.color = 'white';
        themeIcon.classList.remove("fa-solid");
        themeIcon.classList.add("fa-regular");
         
        showPlayList.style.backgroundImage = 'linear-gradient(45deg, #ff007c, #ffebf0)';
        musicInfo.forEach((element) => {
            element.style.backgroundColor = "#181123";
            element.style.color = "white";
        });
    }
}

function playPause() {
 
    if (masterPlay.classList.contains("fa-circle-play")) {
        makeAllPause();
        masterPlay.classList.remove("fa-circle-play");
        masterPlay.classList.add("fa-circle-pause");
        bodyContainer.style.backgroundImage = 'url("3.gif")';
        bodyContainer.style.backgroundRepeat = 'no-repeat';
        bodyContainer.style.backgroundSize = 'cover';
    } else {
        makeAllPause();
        masterPlay.classList.remove("fa-circle-pause");
        masterPlay.classList.add("fa-circle-play");
        bodyContainer.style.backgroundImage = 'linear-gradient(rgb(243 90 148 / 88%), rgb(150 110 137))';
    }
}


let songs = [
    { songName: "Ye-Sham-Mastani", artistName:'Kishor Kumar', filePath: "/songs/1.mp3", coverPath: "/covers/cover1.jpg"},
    { songName: "Mere-Sapano-Ki-Rani", artistName:'Kishor Kumar', filePath: "/songs/2.mp3", coverPath: "/covers/cover1.jpg"},
    { songName: "Pal-Pal-Dil-Ke-Pass", artistName:'Kishor Kumar', filePath: "/songs/3.mp3", coverPath: "/covers/cover1.jpg"},
    { songName: "O-Mere-Dil-Ke-Chain", artistName:'Kishor Kumar', filePath: "/songs/4.mp3", coverPath: "/covers/cover1.jpg"},
    { songName: "Hamen-Tumse-Pyaar-Kitna", artistName:'Kishor Kumar', filePath: "/songs/5.mp3", coverPath: "/covers/cover1.jpg"}
];

let audioElement = new Audio('/songs/3.mp3');

musicInfo.forEach((element, i) => {
    element.getElementsByClassName('musicName')[0].innerText = songs[i].songName;
    element.getElementsByClassName('musicArtist')[0].innerText = songs[i].artistName;
    

});

const makeAllPause = () => {
    musicInfo.forEach((element) => {
        element.childNodes[5].style.display = 'none';
        element.childNodes[3].style.display = 'flex';
    })
}

function getSongDuration() {
     const songDurationMinutes = parseInt(audioElement.duration / 60);
        const songDurationSeconds = parseInt(audioElement.duration - songDurationMinutes * 60);
        songDuration.innerText = `${songDurationMinutes}.${songDurationSeconds}`;
}

musicInfo.forEach((element) => {
    element.addEventListener('click', (e) => {
        console.log(element.childNodes);
        index = e.target.id;
        
        makeAllPause();
        element.childNodes[5].style.display = 'block';
        element.childNodes[3].style.display = 'none';
        audioElement.src = `/songs/${index}.mp3`;
        audioElement.currentTime = 0;
        audioElement.play();
        getSongDuration();
        coverImage.src = `/covers/cover${index}.jpg`;
        songName.innerText = songs[index - 1].songName;
        songArtist.innerText = songs[index - 1].artistName;
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
         bodyContainer.style.backgroundImage = 'url("3.gif")';
        bodyContainer.style.backgroundRepeat = 'no-repeat';
        bodyContainer.style.backgroundSize = 'cover';



    });
});



masterPlay.addEventListener('click', () => {
    
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        getSongDuration();
    }
    else {
        audioElement.pause();
        getSongDuration();
    }
});

progressBar.addEventListener('change', () => {
    audioElement.currentTime = progressBar.value * audioElement.duration / 100;
});

audioElement.addEventListener('ended', () => {
    progressBar.value = 0;
    masterPlay.classList.remove("fa-circle-pause");
    masterPlay.classList.add("fa-circle-play");
    bodyContainer.style.backgroundImage = 'linear-gradient(rgb(243 90 148 / 88%), rgb(150 110 137))';
    songCurrentTime.innerText = '0.00';
    
});

audioElement.addEventListener('timeupdate', () => {
    let progress = parseInt(audioElement.currentTime / audioElement.duration * 100);
    progressBar.value = progress;
    console.log(audioElement.currentTime)
    let minutes = parseInt(audioElement.currentTime / 60);
    let seconds = parseInt(audioElement.currentTime % 60);

    songCurrentTime.innerHTML = `${minutes}.${(seconds<10) ? '0'+seconds:seconds}`;

});


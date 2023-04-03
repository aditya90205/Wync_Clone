console.log("Welcome to Wync Music");
let audioElement = new Audio('song/.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let bottomLyric = document.getElementById('bottomLyric');
let gif = document.getElementById('gif');
let songItem = Array.from(document.getElementsByClassName('songItem'));
let songIndex = 0;

let songs = [
    {songName: "Kesariya Tera ", filepath:"song/kesariya.mp3", coverpath:"cover/kesariya.jpg"},
    {songName: "Ranjhana Ve", filepath:"song/RaanjhanaVe.mp3", coverpath:"cover/ranjhanave.jpg"},
    {songName: "Daru Badnaam", filepath:"song/daru.mp3", coverpath:"cover/Daru-Badnaam.jpg"},
    {songName: "Ghungroo Tut Javega", filepath:"song/ghungroo.mp3", coverpath:"cover/g.jpg"},
    {songName: "Namo Namo", filepath:"song/Namo.mp3", coverpath:"cover/nmm.jpg"},
    {songName: "Rom Rom", filepath:"song/rom.mp3", coverpath:"cover/r.jpg"},
]

songItem.forEach((element,i)=>{
    console.log(element,i)
    element.getElementsByTagName('img')[0].src = songs[i].coverpath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName
})


//Handle play/pause Button
masterPlay.addEventListener('click',()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity = 1;
    }
    else{
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        audioElement.pause()
        gif.style.opacity = 0;
    }
})

//Listen to Events by time event
audioElement.addEventListener('timeupdate',()=>{
    // console.log('timeupdate');

    //---->UPDATE SEEK BAR<----
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100); //kitne PERCENT progress ho rha h wo show hoga N/M *100
    // console.log(progress);
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change',()=>{
    audioElement.currentTime = (myProgressBar.value*audioElement.duration)/100
})


const makeAllPlayer = ()=>{
     Array.from(document.getElementsByClassName("songItemPlay")).forEach((element)=>{
         element.classList.remove('fa-circle-pause');
         element.classList.add('fa-circle-play')
     })
}


Array.from(document.getElementsByClassName("songItemPlay")).forEach((element)=>{
   element.addEventListener('click',(e)=>{
    if(audioElement.paused){
    makeAllPlayer();
    songIndex = parseInt(e.target.id);
    e.target.classList.remove('fa-circle-play');
    e.target.classList.add('fa-circle-pause');
    audioElement.src = `song/${songIndex+1}.mp3`;
    bottomLyric.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
    gif.style.opacity = 1;
    }
    else{
        e.target.classList.remove('fa-circle-pause');
        e.target.classList.add('fa-circle-play');
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        gif.style.opacity = 0;
    }
   })
})

document.getElementById('next').addEventListener('click',()=>{
    if(songIndex>=5){
        songIndex = 0;
    }
    else{
        songIndex += 1;
    }
    audioElement.src = `song/${songIndex+1}.mp3`;
    bottomLyric.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');


})

document.getElementById('previous').addEventListener('click',()=>{
    if(songIndex<=0){
        songIndex = 5;
    }
    else{
        songIndex -= 1;
    }
    audioElement.src = `song/${songIndex+1}.mp3`;
    bottomLyric.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    e.target.classList.remove('fa-circle-pause');
    e.target.classList.add('fa-circle-play');
    audioElement.pause();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');

})

 
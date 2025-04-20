let playBtn = document.querySelector("#play-button");
let playBtn2 = document.querySelector("#pause-button");
let song = document.querySelector("#song");
let sound = document.querySelector("#sfx");

playBtn.addEventListener('click', function() {
    song.play();
    song.volume = 0.5;
})

playBtn2.addEventListener('click', function() {
    song.pause();
    sound.play();
})
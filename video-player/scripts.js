// get elements

const player = document.querySelector('.player');

const video = player.querySelector('.viewer');

const progress = player.querySelector('.progress');

const progressBar = player.querySelector('.progress__filled');

const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

const toggle = player.querySelector('.toggle');
const fullScreen = player.querySelector('.fullscreen');

// write functions
function togglePlay() {
    if (video.paused) {
        video.play();
    } else {
        video.pause();
    }
}

function updateButton() {
    const icon = this.paused ? '►' : '▌▌';
    toggle.textContent = icon;
}

function skip() {
    console.log(';l');
    video.currentTime += parseFloat(this.dataset.skip);

}

function handleRangeUpdate() {
    video[this.name] = this.value;
}

function handleProgress() {
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
}

function fullScreenToggle() {
    if(video.requestFullScreen){
        video.requestFullScreen();
    } else if(video.webkitRequestFullScreen){
        video.webkitRequestFullScreen();
    } else if(video.mozRequestFullScreen){
        video.mozRequestFullScreen();
    }

}

//make events happen

video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);

toggle.addEventListener('click', togglePlay);

skipButtons.forEach((button) => button.addEventListener('click', skip));

ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));

progress.addEventListener('click',scrub);

let mausedown = false;
progress.addEventListener('mousemove',() => mausedown ? scrub(e) : '');
progress.addEventListener('mousedown',()=> mausedown = true);
progress.addEventListener('mouseup',()=> mausedown = false);

fullScreen.addEventListener('click',fullScreenToggle);
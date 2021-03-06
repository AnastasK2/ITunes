import { addZero }  from './supScript.js';

export const videoPlayerInit = () => {

    const videoPlayer = document.querySelector('.video-player');
    const videoButtonPlay = document.querySelector('.video-button__play');
    const videoButtonStop = document.querySelector('.video-button__stop');
    const videoTimePassed = document.querySelector('.video-time__passed');
    const videoProgress = document.querySelector('.video-progress');
    const videoTimeTotal = document.querySelector('.video-time__total');


    const toggleIcon = () => {
        // показ видео
        if(videoPlayer.paused){
            videoButtonPlay.classList.remove('fa-pause');
            videoButtonPlay.classList.add('fa-play');
            } else{
                videoButtonPlay.classList.remove('fa-play');
            videoButtonPlay.classList.add('fa-pause');
            }
    }

    const togglePlay = () => {
        // запуск и остановка видео
        if(videoPlayer.paused){
            videoPlayer.play();
            } else{
                videoPlayer.pause();
            }
            toggleIcon();
    }

    const stopPlay = () => {
        // остановка когда нам надо
        videoPlayer.pause();
        videoPlayer.currentTime = 0;
    }


    videoPlayer.addEventListener('click', togglePlay);
    videoButtonPlay.addEventListener('click', togglePlay);

    videoPlayer.addEventListener('play', toggleIcon);
    videoPlayer.addEventListener('pause', toggleIcon);

    videoButtonStop.addEventListener('click', stopPlay);

    videoPlayer.addEventListener('timeupdate', () => {
        // обновление времени
        const currentTime = videoPlayer.currentTime;
        const duration = videoPlayer.duration;
         
        videoProgress.value = (currentTime / duration) * 100;

        let minutePassed = Math.floor(currentTime / 60);
        let secondsPassed = Math.floor(currentTime % 60);

        let minuteTotal = Math.floor(duration / 60);
        let secondsTotal = Math.floor(duration % 60);
        // добавление 0
        videoTimePassed.textContent = addZero(minutePassed) + ':' + addZero(secondsPassed);
        videoTimeTotal.textContent = addZero(minuteTotal) + ':' + addZero(secondsTotal);

    });

    videoProgress.addEventListener('change', () => {
        // клик по плееру и быстрое перемешение по видео
        const duration = videoPlayer.duration;
        const value = videoProgress.value;

        videoPlayer.currentTime = (value * duration) / 100;
    });
}
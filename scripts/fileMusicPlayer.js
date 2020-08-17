import  { addZero } from './supScript.js';

export const fileMusicPlayerInit = () => {
    const audio = document.querySelector('.audio');
    const audioImg = document.querySelector('.audio-img');
    const audioHeader = document.querySelector('.audio-header');
    const audioPlayer = document.querySelector('.audio-player');
    const audioNavigation = document.querySelector('.audio-navigation');
    const audioButtonPlay = document.querySelector('.audio-button__play');
    const audioProgress = document.querySelector('.audio-progress');
    const audioProgressTiming = document.querySelector('.audio-progress__timing');
    const audioTimePassed = document.querySelector('.audio-time__passed');
    const audioTimeTotal = document.querySelector('.audio-time__total');

    const playlist = ['hello', 'flow', 'speed']; //названия песен

    let trackIndex = 0; //индекс песни, которая играет

    const loadTrack = () => {
        // загрузка трека
        const isPlayed = audioPlayer.paused;
        const track = playlist[trackIndex];
        audioImg.src = `./audio/${track}.jpg`;
        audioHeader.textContent = track.toUpperCase();
        audioPlayer.src = `./audio/${track}.mp3`;

        if(isPlayed) {
            audioPlayer.pause();
        } else {
            audioPlayer.play();
        }
    };

    const prevTrack = () => {
        // переключение на пред трек
        if(trackIndex !== 0){
            trackIndex--;
        } else {
            trackIndex = playlist.length - 1;
        }
        loadTrack();
    };

    const nextTrack = () => {
        // переключение на след трек
        if(trackIndex === playlist.length - 1){
            trackIndex = 0;
        } else {
            trackIndex++;
        }
        loadTrack();
    };


    audioNavigation.addEventListener('click', event => {
        const target = event.target;
        // отслеживаем куда кликнули 
        if(target.classList.contains('audio-button__play')){
            // кнопка плей 
            audio.classList.toggle('play');
            audioButtonPlay.classList.toggle('fa-play');
            audioButtonPlay.classList.toggle('fa-pause');

            if(audioPlayer.paused) {
                audioPlayer.play();
            } else {
                audioPlayer.pause();
            }
            // нажали играть музыку первый раз показываем песню, которая пошла
            const track = playlist[trackIndex];
            audioHeader.textContent = track.toUpperCase();
        }

        if(target.classList.contains('audio-button__prev')){
            prevTrack();
        }

        if(target.classList.contains('audio-button__next')){
          nextTrack();
        }
    });

    audioPlayer.addEventListener('ended', () => {
        // как закончилась одна песня, начинается след
        nextTrack();
        audioPlayer.play();
    });


    audioPlayer.addEventListener('timeupdate', () => {
        // обновление значений времени
        const duration = audioPlayer.duration; 
        const currentTime = audioPlayer.currentTime;
        const progress = (currentTime / duration) * 100;

        audioProgressTiming.style.width = progress + '%';

        const minutePassed = Math.floor(currentTime / 60) || '0';
        const secondPassed = Math.floor(currentTime % 60) || '0';

        const minuteTotal = Math.floor(duration / 60) || '0';
        const secondTotal = Math.floor(duration % 60) || '0';

        // добавили нолики в переди, чтобы красиво время отображалось
        audioTimePassed.textContent = `${addZero(minutePassed)}:${addZero(secondPassed)}`;
        audioTimeTotal.textContent = `${addZero(minuteTotal)}:${addZero(secondTotal)}`;
    });

    audioProgress.addEventListener('click' , e => {
        const x = event.offsetX; 
        //то место, куда кликнули -> от крайней точки левой нашего элемента - разделив на полную длину, полуаем длину куда надо перемотать
        const allWidth = audioProgress.clientWidth;
        const progress = (x / allWidth) * audioPlayer.duration; 
        //в скобках проценты - в дюрейшен то, куда надо перемотать
        audioPlayer.currentTime = progress;
    });
};
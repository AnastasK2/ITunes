import { radioPlayerInit } from './radioPlayer.js';
import { fileMusicPlayerInit } from './fileMusicPlayer.js';
import { videoPlayerInit } from './videoPlayer.js';

const playerBtn = document.querySelectorAll('.player-btn');
const playerBlock = document.querySelectorAll('.player-block');
const temp = document.querySelector('.temp');
const deactivationPlayer = () => {
    // стираем все классы, чтобы не было видно 
    temp.style.display = 'none';
    playerBtn.forEach(item => item.classList.remove('active'));
    playerBlock.forEach(item =>  item.classList.remove('active'));
};


playerBtn.forEach((btn, i) => btn.addEventListener('click', () => {
    // в зависимости от того на что мы нажали, становится активным определенный эелемент
        deactivationPlayer();
        btn.classList.add('active');
        playerBlock[i].classList.add('active');

}));


radioPlayerInit();
fileMusicPlayerInit();
videoPlayerInit();



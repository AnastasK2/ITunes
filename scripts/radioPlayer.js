export const radioPlayerInit = () => {
    const  radio = document.querySelector('.radio');
    const   radioCoverImg = document.querySelector('.radio-cover__img');
    const   radioHeaderBig = document.querySelector('.radio-header__big');
    const radioNavigation = document.querySelector('.radio-navigation');
    const radioItem = document.querySelectorAll('.radioItem');
    const radioStop = document.querySelector('.radio-stop');


    const audio = new Audio(); //функция создает объект конструктора аудио
    audio.type = 'audio/aac';

     radioStop.disabled = true; //остановлено

    const changeIconPlay = () => {
        // меняем кнопку в зависимости от того играет песня или нет
        if(audio.paused){
            radio.classList.remove('play');
            radioStop.classList.add('fa-play');
            radioStop.classList.remove('fa-stop');
        } else {
            radio.classList.add('play');
            radioStop.classList.add('fa-stop');
            radioStop.classList.remove('fa-play');
        }
    };

    const selectItem = elem => {
        radioItem.forEach(item => item.classList.remove('select'));
        elem.classList.add('select');
    };

    radioNavigation.addEventListener('change', event => {
        //воспользуемся делегированием
        const target = event.target;
        const parent = target.closest('.radio-item');
        selectItem(parent);

        // получили название радиостанции и передали
        const title = parent.querySelector('.radio-name').textContent;
        radioHeaderBig.textContent = title;
        // получили изображение и передали
        const urlImg = parent.querySelector('.radio-img').src;
        radioCoverImg.src = urlImg;

        radioStop.disabled = false;  // запустили радио
         audio.src = target.dataset.radioStantion; //передали ссылку на станцию
        audio.play();
        changeIconPlay();  //поменяли кнопку
    });

    radioStop.addEventListener('click', () => {
        // остановка когда надо
        if(audio.paused) {
            audio.play();
        }
        else {
            audio.pause();
        }
        changeIconPlay();
    });
}
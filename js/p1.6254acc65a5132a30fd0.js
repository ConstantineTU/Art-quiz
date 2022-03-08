/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "Z": () => (/* binding */ index)
});

;// CONCATENATED MODULE: ./js/routing/components/questions.js
 // eslint-disable-line

class Questions {
  constructor() {
    this.imagesJSON = 'assets/json/images.json';
    this.qustionCounter = 0;
  }

  async loadAuthorPictures(number, numberJ) {
    if (numberJ) {
      this.qustionCounter = 0;
    }
    const location = window.location.hash;
    const res = await fetch(this.imagesJSON);
    const data = await res.json();
    const author = await data[number].author;

    const imageNum = await data[number].imageNum;
    const name = await data[number].name;
    const year = await data[number].year;
    const imgMini = new Image();
    const imgFull = new Image();
    imgMini.src = `https://raw.githubusercontent.com/ConstantineTU/image-data/master/jpg/img/${number}.jpg`;
    imgFull.src = `https://raw.githubusercontent.com/ConstantineTU/image-data/master/jpg/full/${number}full.jpg`;

    let authors;
    let pictures;
    if (location.includes('#/artist-question-')) {
      authors = await this.shuffle(await this.getRandomAuthors(data, author));
    } else if (location.includes('#/picture-question-')) {
      pictures = await this.shuffle(await this.getRandomPictures(data, imgMini.src));
    }
    if (this.qustionCounter >= 10) {
      index.gameOver();
    }
    if (location) {
      if (this.qustionCounter >= 10 || number % 10 === 0) {
        this.qustionCounter = 0;
      }
      index.locationResolver(location, [
        imgFull.src,
        imgMini.src,
        pictures,
        author,
        authors,
        imageNum,
        name,
        year,
        this.qustionCounter,
      ]);
      this.qustionCounter += 1;
    }
  }

  async getRandomAuthors(data, author) {
    const arr = [];
    arr.push(author);
    await new Promise((resolve) => {
      for (let i = 0; i < 3; i += 1) {
        const randomNum = this.getRandomNumber(0, data.length - 1);
        const randomAuthor = data[randomNum].author;
        let repeat = 0;
        for (let j = 0; j < 3; j += 1) {
          if (arr[j] === randomAuthor) {
            repeat = 1;
          }
        }
        if (!repeat) {
          arr.push(randomAuthor);
          resolve();
        } else {
          i -= 1;
          resolve();
        }
      }
    });
    return arr;
  }

  async getRandomPictures(data, picture) {
    const arr = [];
    arr.push(picture);
    let i = 0;
    const handleLoop = async () => {
      const randomNum = this.getRandomNumber(0, data.length - 1);
      let randomPicture;
      let repeat = false;
      await new Promise((resolve) => {
        const img = new Image();
        img.src = `https://raw.githubusercontent.com/ConstantineTU/image-data/master/jpg/img/${randomNum}.jpg`;
        img.onload = () => {
          randomPicture = `https://raw.githubusercontent.com/ConstantineTU/image-data/master/jpg/img/${randomNum}.jpg`;
          resolve();
        };
      }).then(async () => {
        for (let j = 0; j < 3; j += 1) {
          if (arr[j] === randomPicture) {
            repeat = true;
            break;
          }
        }
        if (!repeat) {
          arr.push(randomPicture);
          i += 1;
        } else {
          i -= 1;
        }
        if (i < 3) {
          await handleLoop();
        }
      });
    };
    await handleLoop();
    return arr;
  }

  shuffle(arrInput) {
    this.arr = arrInput;
    let j;
    let temp;
    for (let i = this.arr.length - 1; i > 0; i -= 1) {
      j = Math.floor(Math.random() * (i + 1));
      temp = this.arr[j];
      this.arr[j] = this.arr[i];
      this.arr[i] = temp;
    }
    return this.arr;
  }

  getRandomNumber(mi, ma) {
    this.min = Math.ceil(mi);
    this.max = Math.floor(ma);
    this.result = Math.floor(Math.random() * (this.max - this.min + 1)) + this.min;
    return this.result;
  }
}

/* harmony default export */ const questions = (Questions);

;// CONCATENATED MODULE: ./js/settings/components/sound.js
class Sound {
  constructor(arrSounds) {
    this.arrSounds = arrSounds;
    this.volume = document.getElementById('settings-volume');
    this.volumeOff = document.querySelector('.settings-main_volume-icons-off');
    this.volume.addEventListener('change', () => {
      for (let i = 0; i < arrSounds.length; i += 1) {
        this.arrSounds[i].currentTime = 0;
        if (i === 0) {
          this.arrSounds[3].play();
        }
        const { value } = this.volume;
        this.arrSounds[i].volume = value;
        this.volume.style.background = `linear-gradient(to right, #ffbca2 0%, #ffbca2 ${value * 100}%, #c4c4c4 ${
          value * 100
        }%, #c4c4c4 100%)`;
        if (value) {
          localStorage.setItem('volume-progress', this.volume.style.background);
          localStorage.setItem('volume-value', value);
        }
      }
    });
    this.getLocalStorage();
    this.volumeOff.onclick = () => {
      this.muteVolume();
    };
  }

  getLocalStorage() {
    let soundVolume = 0.4;
    if (localStorage.getItem('volume-progress')) soundVolume = localStorage.getItem('volume-value');
    this.volume.style.background = `linear-gradient(to right, #ffbca2 0%, #ffbca2 ${soundVolume * 100}%, #c4c4c4 ${
      soundVolume * 100
    }%, #c4c4c4 100%)`;
    this.arrSounds.forEach((sound) => {
      this.sound = sound;
      this.sound.volume = soundVolume;
      this.volume.value = soundVolume;
    });
    if (localStorage.getItem('this.volumeOff')) {
      this.volumeOff.classList.add('active');
      this.arrSounds.forEach((sound) => {
        this.sound = sound;
        this.sound.muted = true;
      });
    }
  }

  muteVolume() {
    this.arrSounds.forEach((sound) => {
      this.sound = sound;
      if (sound.muted) {
        this.volumeOff.classList.remove('active');
        localStorage.removeItem('this.volumeOff');
        this.sound.muted = false;
      } else {
        this.volumeOff.classList.add('active');
        localStorage.setItem('this.volumeOff', 'active');
        this.sound.muted = true;
      }
    });
  }

  playSound(audio) {
    this.audio = audio;
    this.audio.currentTime = 0;
    this.audio.play();
  }

  getSound() {
    return [this.audioCorrect, this.audioClick, this.audioUncorrect];
  }
}

/* harmony default export */ const sound = (Sound);

;// CONCATENATED MODULE: ./js/settings/settings.js
 // eslint-disable-line

class Settings {
  constructor() {
    this.btnOpen = document.getElementById('settings-open');
    this.btnClose = document.getElementById('settings-close');
    this.btnSettings = document.getElementById('settings-title');
    this.settingsWindow = document.getElementById('settings-window');
    this.settingsTimeGame = document.querySelector('.settings-main_timegame');
    this.buttonsClick = document.querySelectorAll('.click');

    this.countTime = document.querySelector('.settings-main_amount');
    this.btnPlusTime = document.querySelector('.settings-main_amount-plus');
    this.btnMinusTime = document.querySelector('.settings-main_amount-minus');

    this.btnOpen.onclick = () => this.showSettings();
    this.btnClose.onclick = () => this.showSettings();
    this.btnSettings.onclick = () => this.showSettings();
    this.settingsTimeGame.onclick = () => this.onTimeGame();
    this.buttonsClick.forEach((click) => {
      click.addEventListener('click', () => index.getSoundInRouting());
    });
    this.btnPlusTime.onclick = () => this.addTime();
    this.btnMinusTime.onclick = () => this.removeTime();
    this.getLocalStorage();
  }

  getLocalStorage() {
    if (localStorage.getItem('this.countTime')) {
      this.countTime.dataset.value = localStorage.getItem('this.countTime');
      this.countTime.textContent = this.countTime.dataset.value;
    }
    if (localStorage.getItem('this.settingsTimeGame')) {
      this.settingsTimeGame.textContent = 'On';
      this.settingsTimeGame.classList.add('active');
    }
  }

  showSettings() {
    if (this.settingsWindow.classList.contains('active')) this.settingsWindow.classList.remove('active');
    else this.settingsWindow.classList.add('active');
  }

  getTimeGame(duration, display, location, durationDefault = duration) {
    this.duration = duration;
    this.durationDefault = durationDefault;
    this.dis = display;
    this.location = location;
    const start = Date.now();
    this.initialTimeValue = Math.round(this.durationDefault - ((Date.now() - start) / 1000 || 0));
    let diff;
    let minutes;
    let seconds;

    const modalOverlay = document.getElementById('modalOverlay');
    const timeProgress = document.getElementById('time-progress');
    const timer = () => {
      diff = Math.round(this.duration - ((Date.now() - start) / 1000 || 0));
      minutes = 0;
      seconds = Math.round(diff % 60 || 0);

      minutes = minutes < 10 ? `0${minutes}` : minutes;
      seconds = seconds < 10 ? `0${seconds}` : seconds;

      this.dis.textContent = `${minutes}:${seconds}`;
      if (100 - (100 / this.initialTimeValue) * seconds > 55) {
        timeProgress.style.background = `linear-gradient(to right, #d82727 0%, #d82727 ${
          100 - (100 / this.initialTimeValue) * seconds
        }%, #c4c4c4 ${100 - (100 / this.initialTimeValue) * seconds}%, #c4c4c4 100%)`;
      } else {
        timeProgress.style.background = `linear-gradient(to right, #3dda69 0%, #3dda69 ${
          100 - (100 / this.initialTimeValue) * seconds
        }%, #c4c4c4 ${100 - (100 / this.initialTimeValue) * seconds}%, #c4c4c4 100%)`;
      }

      if (this.settingsTimeGame.classList.contains('active')) {
        if (modalOverlay.classList.contains('show')) {
          diff += 1;
          index.repeatTimer(diff, this.dis, this.location, this.durationDefault);
        } else if (diff) {
          setTimeout(timer, 1000);
        }
        if (diff <= 0) {
          if (this.location.includes('#/picture-question-')) {
            index.toLongAnswer('picture');
          } else {
            index.toLongAnswer('author');
          }
        }
      }
    };
    timer();
  }

  onTimeGame() {
    this.settingsTimeGame.classList.toggle('active');
    if (this.settingsTimeGame.classList.contains('active')) {
      this.settingsTimeGame.textContent = 'On';
      localStorage.setItem('this.settingsTimeGame', 'active');
    } else {
      this.settingsTimeGame.textContent = 'Off';
      localStorage.removeItem('this.settingsTimeGame');
    }
  }

  addTime() {
    if (this.countTime.dataset.value < 30) {
      this.countTime.dataset.value = +this.countTime.dataset.value + 5;
      this.countTime.textContent = this.countTime.dataset.value;
      localStorage.setItem('this.countTime', this.countTime.dataset.value);
    }
  }

  removeTime() {
    if (this.countTime.dataset.value > 5) {
      this.countTime.dataset.value = +this.countTime.dataset.value - 5;
      this.countTime.textContent = this.countTime.dataset.value;
      localStorage.setItem('this.countTime', this.countTime.dataset.value);
    }
  }
}

;// CONCATENATED MODULE: ./js/routing/components/routing-pages.js
function routingPages() {
  const artistCategories = `
<div class="artist-container">
<div class="artist">
  <div class="artist_body">
    <a id="0" href="#/artist-question-0/" data-href="#/artist-question-0/">
      <div data-categ="0" class="artist_item">
        <div class="artist_item-title-container">
          <div class="artist_item-title">1 categori</div>
          <div class="artist_item-count-container">
            <span class="artist_item-count">0</span>/10
          </div>
        </div>
        <div class="artist_item-img"><img class="artist-img"
            src="assets/img/categories_artist/1.jpg" alt=""></div>
      </div>
    </a>
    <a id="1" href="#/artist-question-1/" data-href="#/artist-question-1/">
      <div data-categ="1" class="artist_item">
        <div class="artist_item-title-container">
          <div class="artist_item-title">2 categori</div>
          <div class="artist_item-count-container">
            <span class="artist_item-count">0</span>/10
          </div>
        </div>
        <div class="artist_item-img"><img class="artist-img"
            src="assets/img/categories_artist/2.jpg" alt=""></div>
      </div>
    </a>
    <a id="2" href="#/artist-question-2/" data-href="#/artist-question-2/">
      <div data-categ="2" class="artist_item">
        <div class="artist_item-title-container">
          <div class="artist_item-title">3 categori</div>
          <div class="artist_item-count-container">
            <span class="artist_item-count">0</span>/10
          </div>
        </div>
        <div class="artist_item-img"><img class="artist-img"
            src="assets/img/categories_artist/3.jpg" alt=""></div>
      </div>
    </a>
    <a id="3" href="#/artist-question-3/" data-href="#/artist-question-3/">
      <div data-categ="3" class="artist_item">
        <div class="artist_item-title-container">
          <div class="artist_item-title">4 categori</div>
          <div class="artist_item-count-container">
            <span class="artist_item-count">0</span>/10
          </div>
        </div>
        <div class="artist_item-img"><img class="artist-img"
            src="assets/img/categories_artist/4.jpg" alt=""></div>
      </div>
    </a>
    <a id="4" href="#/artist-question-4/" data-href="#/artist-question-4/">
      <div data-categ="4" class="artist_item">
        <div class="artist_item-title-container">
          <div class="artist_item-title">5 categori</div>
          <div class="artist_item-count-container">
            <span class="artist_item-count">0</span>/10
          </div>
        </div>
        <div class="artist_item-img"><img class="artist-img"
            src="assets/img/categories_artist/5.jpg" alt=""></div>
      </div>
    </a>
    <a id="5" href="#/artist-question-5/" data-href="#/artist-question-5/">
      <div data-categ="5" class="artist_item">
        <div class="artist_item-title-container">
          <div class="artist_item-title">6 categori</div>
          <div class="artist_item-count-container">
            <span class="artist_item-count">0</span>/10
          </div>
        </div>
        <div class="artist_item-img"><img class="artist-img"
            src="assets/img/categories_artist/6.jpg" alt=""></div>
      </div>
    </a>
    <a id="6" href="#/artist-question-6/" data-href="#/artist-question-6/">
      <div data-categ="6" class="artist_item">
        <div class="artist_item-title-container">
          <div class="artist_item-title">7 categori</div>
          <div class="artist_item-count-container">
            <span class="artist_item-count">0</span>/10
          </div>
        </div>
        <div class="artist_item-img"><img class="artist-img"
            src="assets/img/categories_artist/7.jpg" alt=""></div>
      </div>
    </a>
    <a id="7" href="#/artist-question-7/" data-href="#/artist-question-7/">
      <div data-categ="7" class="artist_item">
        <div class="artist_item-title-container">
          <div class="artist_item-title">8 categori</div>
          <div class="artist_item-count-container">
            <span class="artist_item-count">0</span>/10
          </div>
        </div>
        <div class="artist_item-img"><img class="artist-img"
            src="assets/img/categories_artist/8.jpg" alt=""></div>
      </div>
    </a>
    <a id="8" href="#/artist-question-8/" data-href="#/artist-question-8/">
      <div data-categ="8" class="artist_item">
        <div class="artist_item-title-container">
          <div class="artist_item-title">9 categori</div>
          <div class="artist_item-count-container">
            <span class="artist_item-count">0</span>/10
          </div>
        </div>
        <div class="artist_item-img"><img class="artist-img"
            src="assets/img/categories_artist/9.jpg" alt=""></div>
      </div>
    </a>
    <a id="9" href="#/artist-question-9/" data-href="#/artist-question-9/">
      <div data-categ="9" class="artist_item">
        <div class="artist_item-title-container">
          <div class="artist_item-title">10 categori</div>
          <div class="artist_item-count-container">
            <span class="artist_item-count">0</span>/10
          </div>
        </div>
        <div class="artist_item-img"><img class="artist-img"
            src="assets/img/categories_artist/10.jpg" alt=""></div>
      </div>
    </a>
    <a id="10" href="#/artist-question-10/" data-href="#/artist-question-10/">
      <div data-categ="10" class="artist_item">
        <div class="artist_item-title-container">
          <div class="artist_item-title">11 categori</div>
          <div class="artist_item-count-container">
            <span class="artist_item-count">0</span>/10
          </div>
        </div>
        <div class="artist_item-img"><img class="artist-img"
            src="assets/img/categories_artist/11.jpg" alt=""></div>
      </div>
    </a>
    <a id="11" href="#/artist-question-11/" data-href="#/artist-question-11/">
      <div data-categ="11" class="artist_item">
        <div class="artist_item-title-container">
          <div class="artist_item-title">12 categori</div>
          <div class="artist_item-count-container">
            <span class="artist_item-count">0</span>/10
          </div>
        </div>
        <div class="artist_item-img"><img class="artist-img"
            src="assets/img/categories_artist/12.jpg" alt=""></div>
      </div>
    </a>
  </div>
</div>
</div>
`;
  const picturesCategories = `
<div class="pictures-container">
<div class="pictures">
  <div class="pictures_body">

    <a id="12" href="#/picture-question-12/" data-href="#/picture-question-12/">
      <div data-categ="12" class="pictures_item">
        <div class="pictures_item-title-container">
          <div class="pictures_item-title">12 categori</div>
          <div class="pictures_item-count-container">
            <span class="pictures_item-count">0</span>/10
          </div>
        </div>
        <div class="pictures_item-img"><img class="picture-img"
            src="assets/img/categories_pictures/1.jpg" alt=""></div>
      </div>
    </a>
    <a id="13" href="#/picture-question-13/" data-href="#/picture-question-13/">
      <div data-categ="13" class="pictures_item">
        <div class="pictures_item-title-container">
          <div class="pictures_item-title">13 categori</div>
          <div class="pictures_item-count-container">
            <span class="pictures_item-count">0</span>/10
          </div>
        </div>
        <div class="pictures_item-img"><img class="picture-img"
            src="assets/img/categories_pictures/2.jpg" alt=""></div>
      </div>
    </a>
    <a id="14" href="#/picture-question-14/" data-href="#/picture-question-14/">
      <div data-categ="14" class="pictures_item">
        <div class="pictures_item-title-container">
          <div class="pictures_item-title">14 categori</div>
          <div class="pictures_item-count-container">
            <span class="pictures_item-count">0</span>/10
          </div>
        </div>
        <div class="pictures_item-img"><img class="picture-img"
            src="assets/img/categories_pictures/3.jpg" alt=""></div>
      </div>
    </a>
    <a id="15" href="#/picture-question-15/" data-href="#/picture-question-15/">
      <div data-categ="15" class="pictures_item">
        <div class="pictures_item-title-container">
          <div class="pictures_item-title">15 categori</div>
          <div class="pictures_item-count-container">
            <span class="pictures_item-count">0</span>/10
          </div>
        </div>
        <div class="pictures_item-img"><img class="picture-img"
            src="assets/img/categories_pictures/4.jpg" alt=""></div>
      </div>
    </a>
    <a id="16" href="#/picture-question-16/" data-href="#/picture-question-16/">
      <div data-categ="16" class="pictures_item">
        <div class="pictures_item-title-container">
          <div class="pictures_item-title">16 categori</div>
          <div class="pictures_item-count-container">
            <span class="pictures_item-count">0</span>/10
          </div>
        </div>
        <div class="pictures_item-img"><img class="picture-img"
            src="assets/img/categories_pictures/5.jpg" alt=""></div>
      </div>
    </a>
    <a id="17" href="#/picture-question-17/" data-href="#/picture-question-17/">
      <div data-categ="17" class="pictures_item">
        <div class="pictures_item-title-container">
          <div class="pictures_item-title">17 categori</div>
          <div class="pictures_item-count-container">
            <span class="pictures_item-count">0</span>/10
          </div>
        </div>
        <div class="pictures_item-img"><img class="picture-img"
            src="assets/img/categories_pictures/6.jpg" alt=""></div>
      </div>
    </a>
    <a id="18" href="#/picture-question-18/" data-href="#/picture-question-18/">
      <div data-categ="18" class="pictures_item">
        <div class="pictures_item-title-container">
          <div class="pictures_item-title">18 categori</div>
          <div class="pictures_item-count-container">
            <span class="pictures_item-count">0</span>/10
          </div>
        </div>
        <div class="pictures_item-img"><img class="picture-img"
            src="assets/img/categories_pictures/7.jpg" alt=""></div>
      </div>
    </a>
    <a id="19" href="#/picture-question-19/" data-href="#/picture-question-19/">
      <div data-categ="19" class="pictures_item">
        <div class="pictures_item-title-container">
          <div class="pictures_item-title">19 categori</div>
          <div class="pictures_item-count-container">
            <span class="pictures_item-count">0</span>/10
          </div>
        </div>
        <div class="pictures_item-img"><img class="picture-img"
            src="assets/img/categories_pictures/8.jpg" alt=""></div>
      </div>
    </a>
    <a id="20" href="#/picture-question-20/" data-href="#/picture-question-20/">
      <div data-categ="20" class="pictures_item">
        <div class="pictures_item-title-container">
          <div class="pictures_item-title">20 categori</div>
          <div class="pictures_item-count-container">
            <span class="pictures_item-count">0</span>/10
          </div>
        </div>
        <div class="pictures_item-img"><img class="picture-img"
            src="assets/img/categories_pictures/9.jpg" alt=""></div>
      </div>
    </a>
    <a id="21" href="#/picture-question-21/" data-href="#/picture-question-21/">
      <div data-categ="21" class="pictures_item">
        <div class="pictures_item-title-container">
          <div class="pictures_item-title">21 categori</div>
          <div class="pictures_item-count-container">
            <span class="pictures_item-count">0</span>/10
          </div>
        </div>
        <div class="pictures_item-img"><img class="picture-img"
            src="assets/img/categories_pictures/10.jpg" alt=""></div>
      </div>
    </a>
    <a id="22" href="#/picture-question-22/" data-href="#/picture-question-22/">
      <div data-categ="22" class="pictures_item">
        <div class="pictures_item-title-container">
          <div class="pictures_item-title">22 categori</div>
          <div class="pictures_item-count-container">
            <span class="pictures_item-count">0</span>/10
          </div>
        </div>
        <div class="pictures_item-img"><img class="picture-img"
            src="assets/img/categories_pictures/11.jpg" alt=""></div>
      </div>
    </a>
    <a id="23" href="#/picture-question-23/" data-href="#/picture-question-23/">
      <div data-categ="23" class="pictures_item">
        <div class="pictures_item-title-container">
          <div class="pictures_item-title">23 categori</div>
          <div class="pictures_item-count-container">
            <span class="pictures_item-count">0</span>/10
          </div>
        </div>
        <div class="pictures_item-img"><img class="picture-img"
            src="assets/img/categories_pictures/12.jpg" alt=""></div>
      </div>
    </a>
  </div>
</div>
</div>
  `;
  const mainHtml = `
<div class="title-cotainer">
        <h1 class="title">Art Quiz</h1>
        <div class="categories-container">
          <a id="categories-artist" href="#/artist/" data-href="#/artist/" ><button id="categories-artist"
              class=" button_menu click">Artist quiz</button></a>
          <a id="categories-pictures" href="#/pictures/" data-href="#/pictures/" ><button
              class=" button_menu click">Pictures
              quiz</button></a>
        </div>
      </div>
`;
  const mainHeader = `
  <div class="header-left">
    <div class="header-logo"></div>
    <a id="main-menu-categories" href="#/" data-href="#/">
      <div class="header-left-categories click"><span id="headerCategoriesName"
          class="header-left-categories-name click">Pictures</span> categories</div>
    </a>
  </div>
  <div class="header-right">
    <a id="anouther-category-link" href="#/pictures/" data-href="#/pictures/">
    <div id="anouther-category" class="header-right-categories click"></div>
    </a>
    <div class="header-right-score"></div>
    <div class="header-settings">
      <div id="settings-open" class="header-settings_icon click"></div>
    </div>
  </div>
`;
  const questionsAuthorHeader = `
<div class="questions-author-header">
    <div id="questions-author-header-main"  class="questions-author-header_exit-icon click"></div>
    <div id="time-progress" class="questions-author-time-progress"></div>
    <div class="questions-author-time-container">
      <div class="questions-author-time"><span class="questions-author-time_count"></span></div>
    </div>
  </div>
`;
  const questionsPictureHeader = `
<div class="questions-picture-header">
<div id="questions-author-header-main"  class="questions-author-header_exit-icon click"></div>
    <div id="time-progress" class="questions-picture-time-progress"></div>
    <div class="questions-picture-time-container">
      <div class="questions-picture-time"><span class="questions-picture-time_count"></span></div>
    </div>
  </div>
`;
  return [artistCategories, picturesCategories, mainHtml, mainHeader, questionsAuthorHeader, questionsPictureHeader];
}

;// CONCATENATED MODULE: ./js/routing/routing.js
 // eslint-disable-line

 // eslint-disable-line


class Routing {
  constructor() {
    this.main = document.querySelector('#main-container');
    this.header = document.getElementById('header');
    this.body = document.querySelector('body');
    this.isTimeGame = document.querySelector('.settings-main_timegame');
    this.countTime = document.querySelector('.settings-main_amount');

    this.audioCorrect = new Audio();
    this.audioUncorrect = new Audio();
    this.audioEnd = new Audio();
    this.audioClick = new Audio();
    this.audioClick.src = './assets/sounds/click.mp3';
    this.audioCorrect.src = './assets/sounds/correct.mp3';
    this.audioUncorrect.src = './assets/sounds/uncorrect.mp3';
    this.audioEnd.src = './assets/sounds/end.mp3';

    this.Question = new questions();
    this.Sound = new sound([this.audioCorrect, this.audioUncorrect, this.audioEnd, this.audioClick]);
    this.Settings = new Settings();
    this.Settings = new Settings();

    this.modalExit = document.getElementById('modalExit');
    this.modalCorrect = document.getElementById('modalCorrect');
    this.modalEnd = document.getElementById('modalEnd');
    this.modalOverlay = document.getElementById('modalOverlay');
    this.modalButtons = document.querySelectorAll('.modal-button');
    this.modalPicture = document.querySelector('.modal-correct-picture');
    this.modalNamePicture = document.querySelector('.modal-correct-name');
    this.modalAuthorPicture = document.querySelector('.modal-correct-author');
    this.modalYearPicture = document.querySelector('.modal-correct-year');
    this.modalIconPicture = document.querySelector('.modal-correct-icon');
    this.modalButtonNextQuiz = document.querySelector('.modal-button-plus');
    this.modalButtonCategories = document.querySelector('.modal-button-categories');
    this.modalEndResult = document.querySelector('.modal-end-title-result');

    this.buttonsClick = document.querySelectorAll('.click');

    [
      this.artistCategories,
      this.picturesCategories,
      this.mainHtml,
      this.mainHeader,
      this.QuestionAuthorHeader,
      this.QuestionPictureHeader,
    ] = routingPages();
    this.questionNumber = 0;
    this.isCategoriesLoad = false;
    window.addEventListener('load', () => {
      this.onLocationChange();
    });
    window.addEventListener('hashchange', () => {
      this.onLocationChange();
    });
    this.buttonsClick.forEach((buttonClick) => {
      const click = buttonClick;
      click.onclick = () => this.Sound.playSound(this.audioClick);
    });
  }

  async onLocationChange() {
    const location = window.location.hash;
    if (location) {
      if (location.includes('#/artist-question-')) {
        this.questionNumber = location.split('-', 3)[2].split('/', 1) * 10;
      }
      this.locationResolver(location);
    }
  }

  async locationResolver(location, info) {
    if (this.modalEnd.classList.contains('show')) {
      this.modalEnd.classList.remove('show');
      setTimeout(() => {
        this.modalOverlay.classList.remove('show');
      }, 1000);
    } else {
      this.modalExit.classList.remove('show');
      this.modalCorrect.classList.remove('show');
      this.modalOverlay.classList.remove('show');
    }

    if (!info && location.includes('#/artist-question-')) {
      await this.Question.loadAuthorPictures(this.questionNumber);
      return;
    }
    if (!info && location.includes('#/picture-question-')) {
      this.questionNumber = location.split('-', 3)[2].split('/', 1) * 10;
      await this.Question.loadAuthorPictures(this.questionNumber);
      return;
    }
    if (info) {
      [
        this.picture,
        this.pictureMini,
        this.randomPictures,
        this.author,
        this.randomAuthors,
        this.imageNum,
        this.name,
        this.year,
        this.qustionCounter,
      ] = info;
    }
    if (document.getElementById('categories-artist')) {
      this.categoriesArtist = document.getElementById('categories-artist');
      this.categoriesPictures = document.getElementById('categories-pictures');
    }
    if (document.getElementById('main-menu-categories')) {
      this.mainMenuCategories = document.getElementById('main-menu-categories');
      this.mainMenuHome = document.getElementById('main-menu-home');
    }
    if (location === '#/artist/') {
      this.header.classList.add('active');
      this.body.style.background = `rgba(0, 0, 0, 1) url("") no-repeat scroll center center /cover`;
      this.header.innerHTML = this.mainHeader;
      this.categoriesName = document.getElementById('headerCategoriesName');
      this.categoriesName.innerHTML = 'Artists';
      this.anoutherCategory = document.getElementById('anouther-category');
      this.anoutherCategory.innerHTML = 'Pictures categories';
      console.log(this.anoutherCategory);

      this.buttonsClick.forEach((clickBtn) => {
        const click = clickBtn;
        click.onclick = () => this.Sound.playSound(this.audioClick);
      });
      this.main.innerHTML = this.artistCategories;
      this.artistItemImg = document.querySelectorAll('.artist_item-img');
      this.artistItemImg.forEach((artist) => {
        artist.parentElement.parentElement.addEventListener('click', function viewedAuthorСategory() {
          localStorage.setItem(`artist.id${this.id}`, this.id);
        });
      });
      this.artistItemImg.forEach((artist) => {
        for (let i = 0; i < 12; i += 1) {
          if (artist.parentElement.parentElement.id === localStorage.getItem(`artist.id${i}`)) {
            artist.parentElement.classList.add('active');
            artist.classList.add('active');
          }
        }
      });
      this.Settings = new Settings();
      this.questionNumber = 0;
    } else if (location === '#/pictures/') {
      this.header.classList.add('active');
      this.body.style.background = `rgba(0, 0, 0) url("") no-repeat scroll center center /cover`;
      this.header.innerHTML = this.mainHeader;
      this.anoutherCategory = document.getElementById('anouther-category');
      this.anoutherCategoryLink = document.getElementById('anouther-category-link');
      this.anoutherCategoryLink.href = '#/artist/';
      this.anoutherCategoryLink.dataset.href = '#/artist/';
      this.anoutherCategory.innerHTML = 'Artists categories';
      this.buttonsClick.forEach((clickBtn) => {
        const click = clickBtn;
        click.onclick = () => {
          this.Sound.playSound(this.audioClick);
        };
      });
      this.main.innerHTML = this.picturesCategories;
      this.picturesItemImg = document.querySelectorAll('.pictures_item-img');
      this.picturesItemImg.forEach((picture) => {
        picture.parentElement.parentElement.addEventListener('click', function viewedPictureСategory() {
          localStorage.setItem(`picture.id${this.id}`, this.id);
        });
      });
      this.picturesItemImg.forEach((picture) => {
        for (let i = 12; i < 24; i += 1) {
          if (picture.parentElement.parentElement.id === localStorage.getItem(`picture.id${i}`)) {
            picture.parentElement.classList.add('active');
            picture.classList.add('active');
          }
        }
      });
      this.questionNumber = 0;
      this.Settings = new Settings();
    } else if (location.includes('#/artist-question-')) {
      if (+location.split('-', 3)[2].split('/', 1) + 1 < 12) {
        this.modalButtonNextQuiz.parentElement.href = `#/artist-question-${
          +location.split('-', 3)[2].split('/', 1) + 1
        }/`;
        this.modalButtonNextQuiz.parentElement.dataset.href = `#/artist-question-${
          +location.split('-', 3)[2].split('/', 1) + 1
        }/`;
        this.modalButtonNextQuiz.onclick = () => {
          this.modalEnd.style.zIndex = -1;
          this.modalButtonNextQuiz.parentElement.href = `#/artist-question-${
            +location.split('-', 3)[2].split('/', 1) + 1
          }/`;
          this.modalButtonNextQuiz.parentElement.dataset.href = `#/artist-question-${
            +location.split('-', 3)[2].split('/', 1) + 1
          }/`;
        };
      } else {
        this.modalButtonNextQuiz.parentElement.href = `#/artist-question-${1}/`;
        this.modalButtonNextQuiz.parentElement.dataset.href = `#/artist-question-${1}/`;
        this.modalButtonNextQuiz.onclick = () => {
          this.modalEnd.style.zIndex = -1;
          this.modalButtonNextQuiz.parentElement.href = `#/artist-question-${1}/`;
          this.modalButtonNextQuiz.parentElement.dataset.href = `#/artist-question-${1}/`;
        };
      }
      this.modalButtons.forEach((buttonBtn) => {
        const button = buttonBtn;
        button.onclick = () => {
          button.parentElement.href = `#/artist-question-${location.split('-', 3)[2].split('/', 1)}/`;
          button.parentElement.dataset.href = `#/artist-question-${location.split('-', 3)[2].split('/', 1)}/`;
          this.Question.loadAuthorPictures(this.questionNumber);
          this.modalCorrect.style.zIndex = -1;
        };
      });
      this.body.style.background = `rgba(0, 0, 0) url("") no-repeat scroll center center /cover`;
      this.header.classList.remove('active');
      this.header.innerHTML = this.QuestionAuthorHeader;
      this.main.innerHTML = `
			<div class="questions-author">
							<div class="questions-author-container">
								<h2 class="questions-author-title">Who is the author of this picture?</h2>
								<div class="questions-author-picture" style="background: url('${
                  this.picture
                }') no-repeat scroll center center /contain;"></div>
								<div class="questions-author-bullets">
                ${[...Array(10)]
                  .map(() => {
                    return '<div class="questions-author-bullet"></div>';
                  })
                  .join('')}
								</div>
								<div class="questions-author-answers">
                ${[...Array(4)]
                  .map((_, i) => {
                    return `<a href="#/artist-question-${location
                      .split('-', 3)[2]
                      .split('/', 1)}/" data-href="#/artist-question-${location.split('-', 3)[2].split('/', 1)}/">
                              <button class="button_menu questions-author-answer">${
                                this.randomAuthors[i]
                              }</button></a>`;
                  })
                  .join('')}
								</div>
							</div>
						</div>
			`;
      // ! Timer
      if (this.isTimeGame.classList.contains('active')) {
        this.display = document.querySelector('.questions-author-time_count');
        this.fiveMinutes = this.countTime.dataset.value;
        this.Settings.getTimeGame(this.fiveMinutes, this.display, location, this.fiveMinutes);
      }
      this.buttonsClick.forEach((clickBtn) => {
        const click = clickBtn;
        click.onclick = () => this.Sound.playSound(this.audioClick);
      });
      const headerIconExit = document.getElementById('questions-author-header-main');
      const modalIconExit = document.querySelector('.modal-exite-icon');
      modalIconExit.onclick = () => {
        this.modalOverlay.classList.remove('show');
        this.modalExit.classList.remove('show');
      };
      headerIconExit.onclick = () => {
        this.modalButtonCategories.parentElement.href = `#/artist/`;
        this.modalButtonCategories.parentElement.dataset.href = `#/artist/`;
        this.modalOverlay.classList.add('show');
        this.modalExit.classList.add('show');
      };
      setTimeout(() => {
        this.modalPicture.style.background = `url("${this.pictureMini}") no-repeat scroll center center /cover`;
        this.modalNamePicture.textContent = this.name;
        this.modalAuthorPicture.textContent = this.author;
        this.modalYearPicture.textContent = this.year;
      }, 500);
      const bullets = document.querySelectorAll('.questions-author-bullet');
      if (this.questionNumber === 0 || this.questionNumber % 10 === 0) {
        let result = 0;
        for (let j = 0; j <= 9; j += 1) {
          if (localStorage.getItem(`bullet${j}`) === '#3dda69') {
            result += 1;
          }
        }
        this.modalEndResult.textContent = result;
        this.questionNumber = location.split('-', 3)[2].split('/', 1) * 10;
        for (let j = 0; j <= bullets.length; j += 1) {
          localStorage.removeItem(`bullet${j}`);
        }
      }
      for (let j = 0; j < bullets.length; j += 1) {
        if (localStorage.getItem(`bullet${j}`) && j !== bullets.length - 1) {
          bullets[j].style.background = localStorage.getItem(`bullet${j}`);
        }
      }
      const answers = document.querySelectorAll('.questions-author-answer');
      for (let i = 0; i < answers.length; i += 1) {
        answers[i].onclick = async () => this.getAnswer(answers[i], bullets);
      }
      this.questionNumber += 1;
    } else if (location.includes('#/picture-question-')) {
      if (+location.split('-', 3)[2].split('/', 1) + 1 < 24) {
        this.modalButtonNextQuiz.parentElement.href = `#/picture-question-${
          +location.split('-', 3)[2].split('/', 1) + 1
        }/`;
        this.modalButtonNextQuiz.parentElement.dataset.href = `#/picture-question-${
          +location.split('-', 3)[2].split('/', 1) + 1
        }/`;
        this.modalButtonNextQuiz.onclick = () => {
          this.modalEnd.style.zIndex = -1;
          this.modalButtonNextQuiz.parentElement.href = `#/picture-question-${
            +location.split('-', 3)[2].split('/', 1) + 1
          }/`;
          this.modalButtonNextQuiz.parentElement.dataset.href = `#/picture-question-${
            +location.split('-', 3)[2].split('/', 1) + 1
          }/`;
        };
      } else {
        this.modalButtonNextQuiz.parentElement.href = `#/picture-question-${12}/`;
        this.modalButtonNextQuiz.parentElement.dataset.href = `#/picture-question-${12}/`;
        this.modalButtonNextQuiz.onclick = () => {
          this.modalEnd.style.zIndex = -1;
          this.modalButtonNextQuiz.parentElement.href = `#/picture-question-${12}/`;
          this.modalButtonNextQuiz.parentElement.dataset.href = `#/picture-question-${12}/`;
        };
      }
      this.modalButtons.forEach((buttonBtn) => {
        const button = buttonBtn;
        button.onclick = () => {
          button.parentElement.href = `#/picture-question-${location.split('-', 3)[2].split('/', 1)}/`;
          button.parentElement.dataset.href = `#/picture-question-${location.split('-', 3)[2].split('/', 1)}/`;
          this.Question.loadAuthorPictures(this.questionNumber);
          this.modalCorrect.style.zIndex = -1;
        };
      });
      this.body.style.background = `rgba(0, 0, 0) url("") no-repeat scroll center center /cover`;
      this.header.classList.remove('active');
      this.header.innerHTML = this.QuestionPictureHeader;
      this.main.innerHTML = `
			<div class="questions-picture">
			<div class="questions-picture-container">
				<h2 class="questions-picture-title">Which is <span id="questions-picture-author"
						class="questions-picture-author">${this.author}</span> picture?</h2>
				<div class="questions-picture-answers">
        ${[...Array(4)]
          .map((_, i) => {
            return `<a href="#/picture-question-${location
              .split('-', 3)[2]
              .split('/', 1)}/" data-href="#/picture-question-${location.split('-', 3)[2].split('/', 1)}/">
            <div class="questions-picture-answer"><img class="questions-picture-answer-img" src="${
              this.randomPictures[i]
            }" alt=""></div>
            </a>`;
          })
          .join('')}
				</div>
				<div class="questions-picture-bullets">
        ${[...Array(10)]
          .map(() => {
            return '<div class="questions-picture-bullet"></div>';
          })
          .join('')}
					</div>
			</div>
		</div>
			`;
      // ! Timer
      if (this.isTimeGame.classList.contains('active')) {
        this.display = document.querySelector('.questions-picture-time_count');
        this.fiveMinutes = this.countTime.dataset.value;
        this.Settings.getTimeGame(this.fiveMinutes, this.display, location, this.fiveMinutes);
      }
      this.buttonsClick.forEach((clickBtn) => {
        const click = clickBtn;
        click.onclick = () => {
          this.Sound.playSound(this.audioClick);
        };
      });
      const headerIconExit = document.getElementById('questions-author-header-main');
      const modalIconExit = document.querySelector('.modal-exite-icon');
      modalIconExit.onclick = () => {
        this.modalOverlay.classList.remove('show');
        this.modalExit.classList.remove('show');
      };
      headerIconExit.onclick = () => {
        this.modalButtonCategories.parentElement.href = `#/pictures/`;
        this.modalButtonCategories.parentElement.dataset.href = `#/pictures/`;
        this.modalOverlay.classList.add('show');
        this.modalExit.classList.add('show');
      };
      setTimeout(() => {
        this.modalPicture.style.background = `url("${this.pictureMini}") no-repeat scroll center center /cover`;
        this.modalNamePicture.textContent = this.name;
        this.modalAuthorPicture.textContent = this.author;
        this.modalYearPicture.textContent = this.year;
      }, 500);
      const bullets = document.querySelectorAll('.questions-picture-bullet');
      if (this.questionNumber === 0 || this.questionNumber % 10 === 0) {
        let result = 0;
        for (let j = 0; j <= 9; j += 1) {
          if (localStorage.getItem(`bullet${j}`) === '#3dda69') {
            result += 1;
          }
        }
        this.modalEndResult.textContent = result;
        this.questionNumber = location.split('-', 3)[2].split('/', 1) * 10;
        for (let j = 0; j <= bullets.length; j += 1) {
          localStorage.removeItem(`bullet${j}`);
        }
      }
      for (let j = 0; j < bullets.length; j += 1) {
        if (localStorage.getItem(`bullet${j}`) && j !== bullets.length - 1) {
          bullets[j].style.background = localStorage.getItem(`bullet${j}`);
        }
      }
      const answers = document.querySelectorAll('.questions-picture-answer-img');
      for (let i = 0; i < answers.length; i += 1) {
        answers[i].onclick = () => this.getAnswer(answers[i], bullets);
      }
      this.questionNumber += 1;
    } else if (true) {
      this.body.style.background = `rgba(0, 0, 0) url("./assets/img/main-screen/main_background2.jpg") no-repeat scroll center center /
			cover`;
      this.questionNumber = 0;
      this.header.classList.remove('active');
      this.header.innerHTML = this.mainHeader;
      this.main.innerHTML = this.mainHtml;
      this.buttonsClick.forEach((clickBtn) => {
        const click = clickBtn;
        click.onclick = () => {
          this.Sound.playSound(this.audioClick);
        };
      });
      this.Settings = new Settings();
    }
  }

  gameOver() {
    setTimeout(() => {
      this.modalEnd.classList.add('show');
      this.modalOverlay.classList.add('show');
      this.modalEnd.style.zIndex = 5;
      this.Sound.playSound(this.audioEnd);
    }, 500);
  }

  getAnswer(answer, bullets) {
    this.answer = answer;
    this.bullets = bullets;
    if (this.answer.src === this.pictureMini || this.answer.textContent === this.author) {
      this.modalIconPicture.style.background = `url("./assets/img/svg/correct_answer.svg") no-repeat`;
      localStorage.setItem(`bullet${this.qustionCounter}`, '#3dda69');
      this.bullets[this.qustionCounter].style.background = '#3dda69';
      this.answer.classList.add('correct');
      this.Sound.playSound(this.audioCorrect);
    } else {
      this.modalIconPicture.style.background = `url("./assets/img/svg/wrong_answer.svg") no-repeat`;
      localStorage.setItem(`bullet${this.qustionCounter}`, '#d82727');
      this.bullets[this.qustionCounter].style.background = '#d82727';
      this.answer.classList.add('uncorrect');
      this.Sound.playSound(this.audioUncorrect);
    }
    this.modalCorrect.classList.add('show');
    this.modalOverlay.classList.add('show');
    this.modalCorrect.style.zIndex = 5;
  }

  toLongAnswer(categori) {
    this.categori = categori;
    if (this.categori === 'author') {
      this.bullets = document.querySelectorAll('.questions-author-bullet');
      this.answers = document.querySelectorAll('.questions-author-answer');
    } else if (this.categori === 'picture') {
      this.bullets = document.querySelectorAll('.questions-picture-bullet');
      this.answers = document.querySelectorAll('.questions-picture-answer-img');
    }
    this.answers.forEach((answer) => {
      this.answer = answer;
      localStorage.setItem(`bullet${this.qustionCounter}`, '#d82727');
      this.bullets[this.qustionCounter].style.background = '#d82727';
      this.answer.style.background = '#d82727';
      this.answer.style.color = '#000000';
      this.modalCorrect.classList.add('show');
      this.modalOverlay.classList.add('show');
      this.modalIconPicture.style.background = `url("./assets/img/svg/wrong_answer.svg") no-repeat`;
      this.modalCorrect.style.zIndex = 5;
      this.Sound.playSound(this.audioUncorrect);
      this.answer.classList.add('uncorrect');
    });
  }

  repeatTimer(diff, display, location, durationDefault) {
    this.diff = diff;
    this.durationDefault = durationDefault;
    this.display = display;
    this.location = location;
    const modalExiteIcon = document.querySelector('.modal-exite-icon');
    modalExiteIcon.addEventListener('click', () => {
      this.Settings.getTimeGame(this.diff, this.display, this.location, this.durationDefault);
    });
  }

  getSoundInRouting() {
    this.Sound.playSound(this.audioClick);
  }
}

/* harmony default export */ const routing = (Routing);

;// CONCATENATED MODULE: ./index.js

 // eslint-disable-line

const index_routing = new routing();

/* harmony default export */ const index = (index_routing);

/******/ })()
;
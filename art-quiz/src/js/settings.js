import routing from '../index';

export default class Settings {
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

    this.btnOpen.onclick = () => this.getOpenSettings();
    this.btnClose.onclick = () => this.getCloseSettings();
    this.btnSettings.onclick = () => this.getCloseSettings();
    this.settingsTimeGame.onclick = () => {
      this.settingsTimeGame.classList.toggle('active');
      if (this.settingsTimeGame.classList.contains('active')) {
        this.settingsTimeGame.textContent = 'On';
        localStorage.setItem('this.settingsTimeGame', 'active');
      } else {
        this.settingsTimeGame.textContent = 'Off';
        localStorage.removeItem('this.settingsTimeGame');
      }
    };
    this.buttonsClick.forEach((click) => {
      click.addEventListener('click', () => routing.getSoundInRouting());
    });
    this.btnPlusTime.onclick = () => {
      if (this.countTime.dataset.value < 30) {
        this.countTime.dataset.value = +this.countTime.dataset.value + 5;
        this.countTime.textContent = this.countTime.dataset.value;
        localStorage.setItem('this.countTime', this.countTime.dataset.value);
      }
    };
    this.btnMinusTime.onclick = () => {
      if (this.countTime.dataset.value > 5) {
        this.countTime.dataset.value = +this.countTime.dataset.value - 5;
        this.countTime.textContent = this.countTime.dataset.value;
        localStorage.setItem('this.countTime', this.countTime.dataset.value);
      }
    };
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

  getTimeGame(duration, display, location) {
    const start = Date.now();
    let diff;
    let minutes;
    let seconds;

    const modalOverlay = document.getElementById('modalOverlay');
    function timer() {
      diff = duration - (((Date.now() - start) / 1000) | 0);
      minutes = (diff / 60) | 0;
      seconds = diff % 60 | 0;

      minutes = minutes < 10 ? `0${minutes}` : minutes;
      seconds = seconds < 10 ? `0${seconds}` : seconds;

      display.textContent = `${minutes}:${seconds}`;
      if (modalOverlay.classList.contains('show')) {
        diff += 1;
        clearInterval(time);
        routing.repeatTimer(diff, display, location);
      }
      if (diff <= 0) {
        clearInterval(time);
        if (location.includes('#/picture-question-')) {
          routing.toLongAnswerPicture();
        } else {
          routing.toLongAnswerAuthor();
        }
      }
    }
    timer();

    let time = setInterval(timer, 1000);
  }

  getOpenSettings() {
    this.settingsWindow.classList.add('active');
  }

  getCloseSettings() {
    this.settingsWindow.classList.remove('active');
  }
}

import routing from '../../index'; // eslint-disable-line

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

    this.btnOpen.onclick = () => this.showSettings();
    this.btnClose.onclick = () => this.showSettings();
    this.btnSettings.onclick = () => this.showSettings();
    this.settingsTimeGame.onclick = () => this.onTimeGame();
    this.buttonsClick.forEach((click) => {
      click.addEventListener('click', () => routing.getSoundInRouting());
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
          routing.repeatTimer(diff, this.dis, this.location, this.durationDefault);
        } else if (diff) {
          setTimeout(timer, 1000);
        }
        if (diff <= 0) {
          if (this.location.includes('#/picture-question-')) {
            routing.toLongAnswer('picture');
          } else {
            routing.toLongAnswer('author');
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

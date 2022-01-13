import routing from '../index';

class Sound {
  constructor(arrSounds) {
    this.arrSounds = arrSounds;
    console.log(this.arrSounds);
    this.volume = document.getElementById('settings-volume');
    this.volumeOff = document.querySelector('.settings-main_volume-icons-off');
    this.getLocalStorage();
    this.volume.addEventListener('change', () => {
      for (let i = 0; i < arrSounds.length; i++) {
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
    this.volumeOff.onclick = () => {
      this.muteVolume();
    };
  }

  getLocalStorage() {
    if (localStorage.getItem('volume-progress')) {
      const value = localStorage.getItem('volume-value');
      this.volume.style.background =
        value <= 1
          ? `linear-gradient(to right, #ffbca2 0%, #ffbca2 ${value * 100}%, #c4c4c4 ${value * 100}%, #c4c4c4 100%)`
          : `linear-gradient(to right, #ffbca2 0%, #ffbca2 ${0.4 * 100}%, #c4c4c4 ${0.4 * 100}%, #c4c4c4 100%)`;
      for (let i = 0; i < this.arrSounds.length; i++) {
        this.arrSounds[i].volume = value <= 1 ? value : 0.4;
      }
    }
    if (localStorage.getItem('this.volumeOff')) {
      this.volumeOff.classList.add('active');
      for (let i = 0; i < this.arrSounds.length; i++) {
        this.arrSounds[i].muted = true;
      }
    }
  }

  muteVolume() {
    for (let i = 0; i < this.arrSounds.length; i++) {
      if (this.arrSounds[i].muted) {
        this.volumeOff.classList.remove('active');
        localStorage.removeItem('this.volumeOff');
        this.arrSounds[i].muted = false;
      } else {
        this.volumeOff.classList.add('active');
        localStorage.setItem('this.volumeOff', 'active');
        this.arrSounds[i].muted = true;
        // if (audio.volume === 0) {
        // 	if (localStorage.getItem('volume-value')) {
        // 		volumeProgress.style.background = localStorage.getItem('volume-progress')
        // 		audio.volume = localStorage.getItem('volume-value') / 100
        // 		volumeProgress.value = localStorage.getItem('volume-value') / 100
        // 	} else {
        // 		volumeProgress.style.background = `linear-gradient(to right, #c5b358 0%, #c5b358 ${30}%, #c4c4c4 ${30}%, #c4c4c4 100%)`
        // 		volumeProgress.value = 30 / 100
        // 		audio.volume = 30 / 100
        // 	}
        // }
      }
    }
  }

  playSound(audio) {
    audio.currentTime = 0;
    audio.play();
  }

  getSound() {
    return [this.audioCorrect, this.audioClick, this.audioUncorrect];
  }
}

export default Sound;
